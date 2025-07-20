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