<script lang="ts">
	export let images: string[] = [];
	export let autoplay: boolean = true;
	export let interval: number = 3000;
	export let showDots: boolean = true;
	export let showArrows: boolean = true;
	
	let currentIndex = 0;
	let intervalId: number;
	
	// Auto-play functionality
	$: if (autoplay && images.length > 1) {
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, interval);
	}
	
	function nextSlide() {
		currentIndex = (currentIndex + 1) % images.length;
	}
	
	function prevSlide() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}
	
	function goToSlide(index: number) {
		currentIndex = index;
	}
	
	// Cleanup interval on component destroy
	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<div class="carousel relative w-full max-w-4xl mx-auto">
	<!-- Main Carousel Container -->
	<div class="relative overflow-hidden rounded-lg shadow-lg">
		<!-- Images Container -->
		<div class="flex transition-transform duration-500 ease-in-out" style="transform: translateX(-{currentIndex * 100}%)">
			{#each images as image, index}
				<div class="w-full flex-shrink-0">
					<img 
						src={image} 
						alt="Carousel image {index + 1}" 
						class="w-full h-auto object-contain"
						loading="lazy"
					/>
				</div>
			{/each}
		</div>
		
		<!-- Navigation Arrows -->
		{#if showArrows && images.length > 1}
			<button 
				class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
				on:click={prevSlide}
				aria-label="Previous slide"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
			</button>
			
			<button 
				class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
				on:click={nextSlide}
				aria-label="Next slide"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
				</svg>
			</button>
		{/if}
	</div>
	
	<!-- Dots Navigation -->
	{#if showDots && images.length > 1}
		<div class="flex justify-center mt-4 space-x-2">
			{#each images as _, index}
				<button 
					class="w-3 h-3 rounded-full transition-colors duration-200 {currentIndex === index ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'}"
					on:click={() => goToSlide(index)}
					aria-label="Go to slide {index + 1}"
				></button>
			{/each}
		</div>
	{/if}
	
	<!-- Slide Counter -->
	{#if images.length > 1}
		<div class="text-center mt-2 text-sm text-gray-600">
			{currentIndex + 1} of {images.length}
		</div>
	{/if}
</div>

<style>
	.carousel {
		/* Prevent text selection during drag */
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}
</style> 