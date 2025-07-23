import { components } from './components/index.js';

export function processMdxContent(content: string): string {
	// Process carousel components
	content = processCarouselComponents(content);
	
	return content;
}

function processCarouselComponents(content: string): string {
	// Match carousel components in the format:
	// <Carousel images={["image1.svg", "image2.svg"]} />
	// or
	// <Carousel images={["image1.svg", "image2.svg"]} autoplay={false} interval={5000} />
	
	const carouselRegex = /<Carousel\s+images=\{\[([^\]]+)\]\}\s*(?:(\w+)=\{([^}]+)\}\s*)*\/>/g;
	
	return content.replace(carouselRegex, (match, imagesStr, ...props) => {
		// Parse images array
		const images = imagesStr.split(',').map((img: string) => img.trim().replace(/['"]/g, ''));
		
		// Parse additional props
		const propsObj: any = {};
		for (let i = 0; i < props.length; i += 2) {
			if (props[i] && props[i + 1]) {
				const key = props[i];
				let value = props[i + 1];
				
				// Convert string values to appropriate types
				if (value === 'true') value = true;
				else if (value === 'false') value = false;
				else if (!isNaN(Number(value))) value = Number(value);
				else value = value.replace(/['"]/g, '');
				
				propsObj[key] = value;
			}
		}
		
		// Generate carousel HTML
		return generateCarouselHtml(images, propsObj);
	});
}

function generateCarouselHtml(images: string[], props: any = {}): string {
	const {
		autoplay = true,
		interval = 3000,
		showDots = false,
		showArrows = false
	} = props;
	
	const imagesHtml = images.map((image, index) => `
		<div class="w-1/5 flex-shrink-0 h-full px-1" style="min-width: 20%;">
			<img src="${image}" alt="Company logo ${index + 1}" class="w-full h-full object-contain max-w-full" loading="lazy" />
		</div>
	`).join('');
	
	// Duplicate images for seamless loop
	const duplicatedImagesHtml = imagesHtml + imagesHtml;
	
	return `
		<div class="logo-strip relative w-full overflow-hidden bg-black" style="height: 100px;" data-autoplay="${autoplay}" data-interval="${interval}">
			<div class="logo-container flex transition-transform duration-20s ease-linear" style="width: calc(200% + 1rem);">
				${duplicatedImagesHtml}
			</div>
		</div>
	`;
} 