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
}

export interface AboutData {
	title: string;
	description: string;
	icon: string;
	period?: string;
	category: string;
	slug: string;
	content: string;
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
	
	// Custom order for websites
	const orderMap: { [key: string]: number } = {
		'LondonParkour.com': 1,
		'IORoot.com': 2,
		'RF-1.com': 3,
		'SVGEncode.com': 4,
		'HouseQuests.com': 5
	};
	
	return websites.sort((a, b) => {
		const orderA = orderMap[a.title] || 999;
		const orderB = orderMap[b.title] || 999;
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
		'thirtythree': 2,
		'londonparkour': 3,
		'herdl': 4,
		'parkour-generations': 5,
		'mblox': 6,
		'schroders': 7,
		'ge': 8,
		'img-media': 9,
		'sky': 10,
		'football-association': 11,
		'john-lewis': 12,
		'channel-5': 13,
		'ernest-jones': 14,
		'tui': 15,
		'watchmark': 16,
		'adc-telecommunications': 17,
		'university-hertfordshire-bsc': 18,
		'university-hertfordshire-hnd': 19
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