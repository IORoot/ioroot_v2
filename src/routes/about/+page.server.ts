import type { PageServerLoad } from './$types';
import { loadAboutPages, loadAboutPageBySlug } from '$lib/mdx';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const aboutPages = loadAboutPages();
		const currentSlug = url.searchParams.get('page') || 'bio';
		const currentPage = loadAboutPageBySlug(currentSlug) || aboutPages[0];
		
		return {
			aboutPages,
			currentPage,
			currentSlug
		};
	} catch (error) {
		console.error('Error loading about pages:', error);
		return {
			aboutPages: [],
			currentPage: null,
			currentSlug: 'bio'
		};
	}
}; 