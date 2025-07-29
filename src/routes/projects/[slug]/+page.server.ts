import type { PageServerLoad } from './$types';

// Disable prerendering since this route relies on client-side data fetching
export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
  // Return empty data - will be loaded client-side
  return {
    repo: null,
    slug: params.slug
  };
}; 