import Carousel from './Carousel.svelte';

export const components = {
	Carousel
};

export type ComponentProps = {
	Carousel: {
		images: string[];
		autoplay?: boolean;
		interval?: number;
		showDots?: boolean;
		showArrows?: boolean;
	};
}; 