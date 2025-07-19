import type { PageServerLoad } from './$types';
import { loadWebsites } from '$lib/mdx';

export const load: PageServerLoad = async () => {
	const websites = loadWebsites();
 
	return {
		websites
	};
}; 