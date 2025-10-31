// Supabase Storage Configuration
const SUPABASE_URL = 'https://leltckltotobsibixhqo.supabase.co';
const SUPABASE_STORAGE_PATH = '/storage/v1/object/public/dish_images';

/**
 * Get the full Supabase storage URL for a dish image
 * @param imageUrl - The image URL from the database (e.g., "D-0001/main.png")
 * @returns Full Supabase storage URL
 */
export function getSupabaseImageUrl(imageUrl: string | null | undefined): string {
  // If no image URL provided, return a placeholder
  if (!imageUrl) {
    return '/images/placeholder.jpg';
  }
  
  // If it's already a full URL (starts with http), return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it starts with /images/, it's a local asset, return as is
  if (imageUrl.startsWith('/images/')) {
    return imageUrl;
  }
  
  // Otherwise, construct the Supabase storage URL
  return `${SUPABASE_URL}${SUPABASE_STORAGE_PATH}/${imageUrl}`;
}

/**
 * Get category image URL from Supabase
 * @param categoryId - The category ID
 * @returns Supabase storage URL for category image
 */
export function getCategoryImageUrl(categoryId: string | null | undefined): string {
  if (!categoryId) {
    return '/images/placeholder.jpg';
  }
  
  return `${SUPABASE_URL}${SUPABASE_STORAGE_PATH}/categories/${categoryId}.jpg`;
}
