import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getApiUrl } from "@/config/api";

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
  const res = await fetch(getApiUrl(url), {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include', // Include cookies for session management
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
    const url = getApiUrl(queryKey.join("/"));
    
    try {
      const res = await fetch(url, {
        credentials: 'include', // Include cookies for session management
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
      
      return data;
    } catch (error) {
      console.error('[API Error]', {
        url,
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
