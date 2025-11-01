import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { supabase, mapApiRouteToSupabase } from "@/lib/supabase-client";

// Use direct Supabase REST API
const USE_DIRECT_SUPABASE = true;

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // For direct Supabase, map the URL to Supabase REST API
  if (USE_DIRECT_SUPABASE) {
    const route = url.split('/').filter(Boolean);
    const mapped = mapApiRouteToSupabase(route);
    
    if (method === 'GET') {
      const result = await supabase.select(mapped.table, mapped.options);
      return new Response(JSON.stringify(result), { status: 200 });
    } else if (method === 'POST') {
      const result = await supabase.insert(mapped.table, data);
      return new Response(JSON.stringify(result), { status: 200 });
    }
  }
  
  // Fallback to backend API if needed
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      // Use direct Supabase REST API
      if (USE_DIRECT_SUPABASE) {
        const route = queryKey as string[];
        const mapped = mapApiRouteToSupabase(route);
        
        console.log('[Supabase Direct]', route.join('/'), '→', mapped.table, mapped.options);
        
        let result;
        
        // Special handling for dish-types (need to extract unique values)
        if (route[0] === '/api/dish-types' || route[0]?.includes('dish-types')) {
          const categoryId = route[2] || route[1];
          if (categoryId && categoryId !== 'all') {
            const dishes = await supabase.select('dishes', {
              select: 'dish_type',
              filter: { 'category_id': `eq.${categoryId}` }
            });
            result = [...new Set(
              dishes
                .map((d: any) => d.dish_type)
                .filter((type: any) => type !== null && type !== undefined)
            )].sort();
          } else {
            result = [];
          }
        } else {
          result = await supabase.select(mapped.table, mapped.options);
        }
        
        console.log('[Supabase Data]', route.join('/'), Array.isArray(result) ? `Items: ${result.length}` : 'Data:', result);
        
        return result as T;
      }
      
      // Fallback: use backend API
      const url = queryKey.join("/");
      const res = await fetch(url, {
        credentials: 'include',
      });

      console.log('[API Response]', url, 'Status:', res.status, 'OK:', res.ok);

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        console.log('[API Data]', url, 'Dishes:', data.length, 'Sample:', JSON.stringify(data.slice(0, 2)));
      } else {
        console.log('[API Data]', url, 'Data:', JSON.stringify(data));
      }
      
      return data as T;
    } catch (error) {
      console.error('[API Error]', {
        route: queryKey.join('/'),
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
