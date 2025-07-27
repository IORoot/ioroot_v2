import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface WebsiteData {
	title: string;
	description: string;
	url: string;
	image: string;
	tech: string[];
	status: string;
	icon: string;
	slug: string;
	features: string[];
	content: string;
	category?: string;
	order?: number;
}

export interface AboutData {
	title: string;
	description: string;
	icon: string;
	period?: string;
	category: string;
	slug: string;
	content: string;
	contract?: boolean;
	url?: string;
}

export function loadWebsites(): WebsiteData[] {
	const websitesDir = path.join(process.cwd(), 'src', 'content', 'showcase');
	const files = fs.readdirSync(websitesDir);
	
	const websites: WebsiteData[] = [];
	
	for (const file of files) {
		if (file.endsWith('.mdx')) {
			const filePath = path.join(websitesDir, file);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { data, content } = matter(fileContent);
			
			websites.push({
				...data as Omit<WebsiteData, 'content'>,
				content
			});
		}
	}
	
	// Sort by order field from frontmatter, then by title
	return websites.sort((a, b) => {
		const orderA = a.order || 999;
		const orderB = b.order || 999;
		
		// If orders are equal, sort alphabetically by title
		if (orderA === orderB) {
			return a.title.localeCompare(b.title);
		}
		
		return orderA - orderB;
	});
}

export function loadWebsiteBySlug(slug: string): WebsiteData | null {
	const websites = loadWebsites();
	return websites.find(website => website.slug === slug) || null;
}

export function loadAboutPages(): AboutData[] {
	const aboutDir = path.join(process.cwd(), 'src', 'content', 'about');
	const files = fs.readdirSync(aboutDir);
	
	const aboutPages: AboutData[] = [];
	
	for (const file of files) {
		if (file.endsWith('.mdx')) {
			const filePath = path.join(aboutDir, file);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { data, content } = matter(fileContent);
			const slug = file.replace('.mdx', '');
			
			aboutPages.push({
				...data as Omit<AboutData, 'content' | 'slug'>,
				slug,
				content
			});
		}
	}
	
	// Custom order for about pages
	const orderMap: { [key: string]: number } = {
		'bio': 1,
		'bio_developer': 2,
		'bio_parkour': 3,
		'thirtythree': 4,
		'londonparkour': 5,
		'herdl': 6,
		'parkour-generations': 7,
		'mblox': 8,
		'schroders': 9,
		'ge': 10,
		'img-media': 11,
		'sky': 12,
		'football-association': 13,
		'john-lewis': 14,
		'matchesfashion': 15,
		'channel-5': 16,
		'ernest-jones': 17,
		'tui': 18,
		'watchmark': 19,
		'adc-telecommunications': 20,
		'university-hertfordshire-bsc': 21,
		'university-hertfordshire-hnd': 22
	};
	
	return aboutPages.sort((a, b) => {
		const orderA = orderMap[a.slug] || 999;
		const orderB = orderMap[b.slug] || 999;
		return orderA - orderB;
	});
}

export function loadAboutPageBySlug(slug: string): AboutData | null {
	const aboutPages = loadAboutPages();
	return aboutPages.find(page => page.slug === slug) || null;
} 