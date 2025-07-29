import { components } from './components/index.js';

export function processMdxContent(content: string): string {
	// Process carousel components
	content = processCarouselComponents(content);
	
	// Process video components
	content = processVideoComponents(content);
	
	return content;
}

function processCarouselComponents(content: string): string {
	// Match carousel components in the format:
	// <Carousel images={["image1.svg", "image2.svg"]} />
	// or
	// <Carousel images={["image1.svg", "image2.svg"]} autoplay={false} interval={5000} />
	// or
	// <Carousel topImages={["image1.svg"]} bottomImages={["image2.svg"]} />
	
	// Handle both single-line and multi-line carousel components
	const singleRowRegex = /<Carousel\s+images=\{\[([^\]]+)\]\}\s*(?:(\w+)=\{([^}]+)\}\s*)*\/>/g;
	const twoRowRegex = /<Carousel\s+topImages=\{\[((?:.|\n)*?)\]\}\s+bottomImages=\{\[((?:.|\n)*?)\]\}\s*\/>/g;
	
	// First process single-row carousels
	content = content.replace(singleRowRegex, (match, imagesStr, ...props) => {
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
		
		return generateCarouselHtml(images, propsObj);
	});
	
	// Then process two-row carousels
	return content.replace(twoRowRegex, (match, topImagesStr, bottomImagesStr, ...props) => {
		const topImages = topImagesStr.split(',').map((img: string) => img.trim().replace(/['"]/g, ''));
		const bottomImages = bottomImagesStr.split(',').map((img: string) => img.trim().replace(/['"]/g, ''));
		
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
		
		return generateTwoRowCarouselHtml(topImages, bottomImages, propsObj);
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
		<div class="flex-shrink-0 h-full flex items-center justify-center mr-24">
			<img src="${image}" alt="Company logo ${index + 1}" class="h-16 w-auto object-contain" loading="lazy" />
		</div>
	`).join('');
	
	// Duplicate images for seamless loop
	const duplicatedImagesHtml = imagesHtml + imagesHtml;
	
	return `
		<div class="logo-strip relative w-full overflow-hidden bg-white" style="height: 80px;" data-autoplay="${autoplay}" data-interval="30">
			<div class="logo-container flex" style="width: 200%;">
				${duplicatedImagesHtml}
			</div>
		</div>
	`;
}

function generateTwoRowCarouselHtml(topImages: string[], bottomImages: string[], props: any = {}): string {
	const {
		autoplay = true,
		interval = 3000,
		showDots = false,
		showArrows = false
	} = props;
	
	const topImagesHtml = topImages.map((image, index) => `
		<div class="flex-shrink-0 h-full flex items-center justify-center mr-24">
			<img src="${image}" alt="Company logo ${index + 1}" class="h-16 w-auto object-contain" loading="lazy" />
		</div>
	`).join('');
	
	const bottomImagesHtml = bottomImages.map((image, index) => `
		<div class="flex-shrink-0 h-full flex items-center justify-center mr-24">
			<img src="${image}" alt="Company logo ${index + 1}" class="h-16 w-auto object-contain" loading="lazy" />
		</div>
	`).join('');
	
	// Duplicate images for seamless loop
	const duplicatedTopImagesHtml = topImagesHtml + topImagesHtml;
	const duplicatedBottomImagesHtml = bottomImagesHtml + bottomImagesHtml;
	
	return `
		<div class="logo-strip relative w-full overflow-hidden bg-white" style="height: 200px;" data-autoplay="${autoplay}" data-interval="30">
			<!-- Top row - faster speed -->
			<div class="logo-container-top flex" style="width: 200%;">
				${duplicatedTopImagesHtml}
			</div>
			<!-- Bottom row - slower speed -->
			<div class="logo-container-bottom flex" style="width: 200%; margin-top: 3rem;">
				${duplicatedBottomImagesHtml}
			</div>
		</div>
	`;
}

function processVideoComponents(content: string): string {
	// Match video components in the format:
	// <Video videoId="dQw4w9WgXcQ" />
	// or
	// <Video videoId="dQw4w9WgXcQ" title="My Video" width="800px" height="450px" />
	
	const videoRegex = /<Video\s+videoId="([^"]+)"\s*(?:(\w+)="([^"]+)"\s*)*\/?>/g;
	
	return content.replace(videoRegex, (match, videoId, ...props) => {
		// Parse additional props
		const propsObj: any = {};
		for (let i = 0; i < props.length; i += 2) {
			if (props[i] && props[i + 1]) {
				const key = props[i];
				const value = props[i + 1];
				propsObj[key] = value;
			}
		}
		
		return generateVideoHtml(videoId, propsObj);
	});
}

function generateVideoHtml(videoId: string, props: any = {}): string {
	const {
		title = 'YouTube video',
		width = '100%',
		height = '400px'
	} = props;
	
	return `
		<div class="video-container my-8">
			<div class="relative w-full" style="max-width: ${width}; height: ${height};">
				<iframe
					src="https://www.youtube.com/embed/${videoId}"
					title="${title}"
					class="w-full h-full rounded-lg shadow-lg"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
	`;
} 