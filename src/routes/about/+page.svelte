<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { markdownToHtml } from '$lib/markdown';
	import Navigation from '$lib/components/Navigation.svelte';
	import { initializeCarousels } from '$lib/carousel';
	import { onMount } from 'svelte';
	
	export let data: PageData;
	
	$: aboutPages = data?.aboutPages || [];
	$: currentPage = data?.currentPage || null;
	$: currentSlug = data?.currentSlug || 'bio';
	$: htmlContent = currentPage ? markdownToHtml(currentPage.content) : '';
	
	let selectedFilter = 'all';
	
	$: filters = [
		{ id: 'all', label: 'All', count: aboutPages?.length || 0 },
		{ id: 'employment', label: 'Employment', count: aboutPages?.filter(p => p.category === 'experience').length || 0 },
		{ id: 'parkour', label: 'Parkour', count: aboutPages?.filter(p => p.category === 'parkour').length || 0 },
		{ id: 'education', label: 'Education', count: aboutPages?.filter(p => p.category === 'education').length || 0 }
	];
	
	$: filteredPages = selectedFilter === 'all' 
		? aboutPages || []
		: selectedFilter === 'employment'
		? (aboutPages || []).filter(page => page.category === 'experience')
		: (aboutPages || []).filter(page => page.category === selectedFilter);
	
	function navigateToPage(slug: string) {
		goto(`/about?page=${slug}`);
	}
	
	function getStartDate(period: string): string {
		if (!period) return '';
		const startDate = period.split(' - ')[0];
		return startDate;
	}
	
	function selectFilter(filterId: string) {
		selectedFilter = filterId;
	}
	
	function handleImageError(event: Event, originalSrc: string) {
		const img = event.target as HTMLImageElement;
		if (img) {
			img.src = originalSrc;
			img.onerror = () => {
				img.style.display = 'none';
				img.nextElementSibling?.classList.remove('hidden');
			};
		}
	}
	
	// Initialize carousels when content changes
	$: if (htmlContent && typeof window !== 'undefined') {
		// Wait for DOM to update
		setTimeout(() => {
			initializeCarousels();
		}, 100);
	}
	
	onMount(() => {
		// Initialize carousels after component mounts
		setTimeout(() => {
			initializeCarousels();
		}, 100);
	});
</script>

<svelte:head>
	<title>About - Andy Pearson</title>
	<meta name="description" content="Learn more about Andy Pearson's background, experience, and journey in technology." />
</svelte:head>

<div class="min-h-screen bg-stone-50 pt-20">
	<!-- Film Grain Overlay -->
	<div class="absolute inset-0 opacity-5">
		<img src="/images/bento/film-grain.svg" alt="" class="w-full h-full object-cover" />
	</div>
	
	<!-- Top Padding Bar for Navigation Background -->
	<div class="fixed top-0 left-0 right-0 h-20 bg-[#87A7AC] z-40"></div>
	
	<Navigation />

	<!-- Main Content -->
	<div class="">
		<div class="max-w-[1600px] mx-auto px-8">
			<div class="flex min-h-screen">
				<!-- Filter Sidebar -->
				<div class="w-64 bg-white border-r border-gray-200 relative z-5 pt-8 h-screen overflow-y-auto scrollbar-hide">
					<!-- 8px Grid Overlay for Background -->
					<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
					</div>
					
					<div class="relative z-10 p-6">
						<div class="space-y-3">
							{#each filters as filter}
								<button
									on:click={() => selectFilter(filter.id)}
									class="w-full p-4 text-left transition-all duration-200 hover:bg-[#87A7AC]/10 rounded-lg group"
								>
									<div class="flex justify-between items-center">
										<span class="text-gray-800 font-medium">
											{filter.label}
										</span>
										<span class="text-[#87A7AC] text-sm font-mono">
											{filter.count}
										</span>
									</div>
								</button>
							{/each}
							
							<!-- Download CV Button -->
							<div class="pt-4 border-t border-gray-200">
								<a 
									href="/docs/cv.md" 
									download="Andy_Pearson_CV.md"
									class="cv-download-btn w-full p-4 text-center transition-all duration-200 rounded-lg group text-white border border-[#E7A97F]/20 flex items-center justify-center space-x-2"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
									</svg>
									<span class="font-medium">Download CV</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="w-96 bg-white border-r border-gray-200 relative z-5 pt-8 h-screen overflow-y-auto scrollbar-hide">
					<!-- 8px Grid Overlay for Background -->
					<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
					</div>
					
					<div class="relative z-10 p-6">
						<div class="space-y-4">
							{#each filteredPages as page}
								<button
									on:click={() => navigateToPage(page.slug)}
									class="w-full p-6 text-left transition-all duration-200 hover:bg-[#87A7AC] rounded-lg group bg-gray-50/50 {currentSlug === page.slug ? 'bg-[#87A7AC]/20 border border-[#87A7AC]/30' : 'border border-gray-200'}"
								>
									<!-- Header with title and date -->
									<div class="flex justify-between items-start mb-4">
										<div class="flex-1">
											<h3 class="text-gray-800 font-semibold text-lg group-hover:text-white transition-colors">
												{page.title}
											</h3>
											{#if page.contract}
												<p class="text-[#87A7AC] text-xs font-medium mt-1 group-hover:text-white/80 transition-colors">
													contract
												</p>
											{/if}
										</div>
										{#if page.period}
											<p class="text-[#87A7AC] text-xs group-hover:text-white/80 transition-colors">
												{getStartDate(page.period)}
											</p>
										{/if}
									</div>
									
									<!-- Icon -->
									<div class="text-center">
										{#if page.icon}
											<img 
												src={page.icon} 
												alt="{page.title} logo" 
												class="w-24 h-24 mx-auto logo-accent transition-all duration-200"
											/>
										{:else}
											<div class="text-[#87A7AC] text-2xl font-bold text-center group-hover:text-white transition-colors">
												{page.title}
											</div>
										{/if}
									</div>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- Content Area -->
				<div class="flex-1 bg-white relative z-5 pt-8 min-w-0 h-screen overflow-y-auto scrollbar-hide">
					<!-- 8px Grid Overlay for Background -->
					<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
					</div>
					
					<div class="relative z-10 p-8">
						{#if currentPage}
							<div class="max-w-4xl">
																<!-- Header -->
								<div class="mb-8">
									<div class="flex items-start space-x-6 mb-4">
										<div class="flex-shrink-0">
											{#if currentPage.url}
												<a 
													href={currentPage.url} 
													target="_blank" 
													rel="noopener noreferrer"
													class="block transition-transform duration-200 hover:scale-105"
												>
													<img src={currentPage.icon} alt="{currentPage.title} logo" class="w-40 h-40 logo-accent" />
												</a>
											{:else}
												<img src={currentPage.icon} alt="{currentPage.title} logo" class="w-40 h-40 logo-accent" />
											{/if}
										</div>
										<div class="flex-1 min-w-0">
											<h1 class="text-gray-900 text-4xl font-bold mb-2">
												{currentPage.title}
											</h1>
											{#if currentPage.url}
												<a 
													href={currentPage.url} 
													target="_blank" 
													rel="noopener noreferrer"
													class="text-[#87A7AC] hover:text-[#E7A97F] text-lg font-medium transition-colors duration-200 underline"
												>
													{currentPage.url}
												</a>
											{/if}
											<p class="text-gray-600 text-xl mt-2">
												{currentPage.description}
											</p>
											{#if currentPage.period}
												<p class="text-[#87A7AC] text-lg mt-1">
													{getStartDate(currentPage.period)}
												</p>
											{/if}
										</div>
									</div>
									
									<!-- Profile Image for About Me page -->
									{#if currentPage.slug === 'bio'}
										<div class="mt-8 text-center">
											<img src="/images/about/andy_profile.jpg" alt="Andy Pearson" class="w-96 h-96 mx-auto rounded-full object-contain shadow-lg" />
										</div>
									{/if}
								</div>

								<!-- Content -->
								<div class="prose prose-lg max-w-none">
									{@html htmlContent}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.prose) {
		color: rgb(55 65 81);
		line-height: 1.6;
	}
	
	:global(.prose p) {
		line-height: 2;
		margin-bottom: 1.5rem;
		margin-top: 0.5rem;
	}
	
	/* First paragraph styling - large and original orange (only the very first paragraph) */
	:global(.prose > p:first-of-type) {
		font-size: 2.25rem; /* 4xl */
		color: #E7A97F;
		line-height: 1.8;
		margin-bottom: 2rem;
		margin-top: 0;
		font-weight: 500;
	}
	
	/* Override for paragraphs that come after h3+ headers */
	:global(.prose h3 + p),
	:global(.prose h4 + p),
	:global(.prose h5 + p),
	:global(.prose h6 + p) {
		font-size: 1.125rem !important; /* text-lg */
		color: rgb(55 65 81) !important;
		line-height: 2 !important;
		margin-bottom: 1.5rem !important;
		margin-top: 0.5rem !important;
		font-weight: 400 !important;
	}
	
	:global(.prose p:nth-child(-n+2)) {
		line-height: 1.6;
		margin-bottom: 1rem;
		margin-top: 0;
	}
	
	:global(.prose h1) {
		color: rgb(17 24 39);
	}
	
	:global(.prose h2) {
		color: rgb(17 24 39);
	}
	
	:global(.prose h3) {
		color: rgb(17 24 39);
	}
	
	:global(.prose strong) {
		color: rgb(135 167 172);
	}
	
	/* Strong text styling - transparent background with gradient text */
	:global(.prose strong) {
		font-weight: 700;
		background: transparent;
		background: linear-gradient(135deg, #87A7AC, #677A67, #4A5D5F);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		padding: 2px 6px;
		border-radius: 4px;
	}
	
	/* Underlined text styling - heavier font, underlined with gradient */
	:global(.prose u) {
		font-weight: 700;
		text-decoration: underline;
		text-decoration-color: #87A7AC;
		text-decoration-thickness: 8px;
		background: linear-gradient(135deg, #87A7AC, #677A67, #4A5D5F);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	:global(.prose a) {
		font-weight: 700;
		background: linear-gradient(135deg, #87A7AC, #677A67, #4A5D5F);
		color: white;
		padding: 2px 6px;
		border-radius: 4px;
		text-decoration: none;
		transition: background 0.3s ease;
	}
	
	:global(.prose a:hover) {
		background: linear-gradient(135deg, #E7A97F, #D4946A, #C17F55);
		color: white;
	}
	
	:global(.prose ul) {
		color: rgb(55 65 81);
	}
	
	:global(.prose li) {
		color: rgb(55 65 81);
	}
	
	/* Hide scrollbars */
	.scrollbar-hide {
		-ms-overflow-style: none;  /* Internet Explorer 10+ */
		scrollbar-width: none;  /* Firefox */
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;  /* Safari and Chrome */
	}
	
	/* Logo styling with accent color */
	.logo-accent {
		filter: brightness(0.4) contrast(1.3) saturate(0.7);
		transition: all 0.3s ease;
		transform: scale(1);
	}
	
	.group:hover .logo-accent {
		filter: brightness(0) invert(1);
		transform: scale(1.1);
	}
	
	/* Special handling for JPG/PNG images */
	.logo-accent[src*=".jpg"], .logo-accent[src*=".jpeg"], .logo-accent[src*=".png"] {
		filter: none;
		border-radius: 0.5rem;
	}
	
	.group:hover .logo-accent[src*=".jpg"], 
	.group:hover .logo-accent[src*=".jpeg"], 
	.group:hover .logo-accent[src*=".png"] {
		filter: none;
		transform: scale(1.1);
		border-radius: 0.5rem;
	}
	
	/* CV Download Button */
	.cv-download-btn {
		background: linear-gradient(to right, #E7A97F, #D4946A);
	}
	
	.cv-download-btn:hover {
		background: #87A7AC !important;
	}
</style> 