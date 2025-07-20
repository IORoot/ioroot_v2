import type { PageServerLoad } from './$types';
import { loadWebsiteBySlug } from '$lib/mdx';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	
	const website = loadWebsiteBySlug(slug);
	
	if (!website) {
		return {
			status: 404,
			error: 'Website not found'
		};
	}
	
	return {
		website
	};
}; 