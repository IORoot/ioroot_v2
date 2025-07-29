import Carousel from './Carousel.svelte';
import Video from './Video.svelte';

export const components = {
	Carousel,
	Video
};

export type ComponentProps = {
	Carousel: {
		images: string[];
		autoplay?: boolean;
		interval?: number;
		showDots?: boolean;
		showArrows?: boolean;
	};
	Video: {
		videoId: string;
		title?: string;
		width?: string;
		height?: string;
	};
}; 