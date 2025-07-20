<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { markdownToHtml } from '$lib/markdown';
	import Navigation from '$lib/components/Navigation.svelte';
	
	export let data: PageData;
	
	$: aboutPages = data?.aboutPages || [];
	$: currentPage = data?.currentPage || null;
	$: currentSlug = data?.currentSlug || 'bio';
	$: htmlContent = currentPage ? markdownToHtml(currentPage.content) : '';
	
	let selectedFilter = 'all';
	
	$: filters = [
		{ id: 'all', label: 'All', count: aboutPages?.length || 0 },
		{ id: 'me', label: 'Me', count: aboutPages?.filter(p => p.category === 'me').length || 0 },
		{ id: 'experience', label: 'Experience', count: aboutPages?.filter(p => p.category === 'experience').length || 0 },
		{ id: 'parkour', label: 'Parkour', count: aboutPages?.filter(p => p.category === 'parkour').length || 0 },
		{ id: 'education', label: 'Education', count: aboutPages?.filter(p => p.category === 'education').length || 0 }
	];
	
	$: filteredPages = selectedFilter === 'all' 
		? aboutPages || []
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
</script>

<svelte:head>
	<title>About - Andy Pearson</title>
	<meta name="description" content="Learn more about Andy Pearson's background, experience, and journey in technology." />
</svelte:head>

<div class="min-h-screen bg-[#1a1a1a] relative">
	<!-- Film Grain Overlay -->
	<div class="absolute inset-0 opacity-10">
		<img src="/images/bento/film-grain.svg" alt="" class="w-full h-full object-cover" />
	</div>
	
	<Navigation />

	<!-- Main Content -->
	<div class="">
		<div class="max-w-[1600px] mx-auto px-8">
			<div class="flex min-h-screen">
				<!-- Filter Sidebar -->
				<div class="w-64 bg-transparent border-r border-white/10 relative z-5 pt-32 h-screen overflow-y-auto scrollbar-hide">
					<!-- 8px Grid Overlay for Background -->
					<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
					</div>
					
					<div class="relative z-10 p-6">
						<div class="space-y-3">
							{#each filters as filter}
								<button
									on:click={() => selectFilter(filter.id)}
									class="w-full p-4 text-left transition-all duration-200 hover:bg-white/5 rounded-lg group"
								>
									<div class="flex justify-between items-center">
										<span class="text-white font-medium">
											{filter.label}
										</span>
										<span class="text-green-400 text-sm font-mono">
											{filter.count}
										</span>
									</div>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="w-96 bg-transparent border-r border-white/10 relative z-5 pt-32 h-screen overflow-y-auto scrollbar-hide">
					<!-- 8px Grid Overlay for Background -->
					<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
					</div>
					
					<div class="relative z-10 p-6">
						<div class="space-y-4">
							{#each filteredPages as page}
								<button
									on:click={() => navigateToPage(page.slug)}
									class="w-full p-6 text-left transition-all duration-200 hover:bg-white/10 rounded-lg group bg-white/5 {currentSlug === page.slug ? 'bg-white/15 border border-white/30' : 'border border-white/10'}"
								>
									<!-- Header with title and date -->
									<div class="flex justify-between items-start mb-4">
										<h3 class="text-white font-semibold text-lg">
											{page.title}
										</h3>
										{#if page.period}
											<p class="text-green-400 text-xs">
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
												class="w-24 h-24 mx-auto"
											/>
										{:else}
											<div class="text-white text-2xl font-bold text-center">
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
				<div class="flex-1 bg-[#1a1a1a] relative z-5 pt-32 min-w-0 h-screen overflow-y-auto scrollbar-hide">
					<!-- 8px Grid Overlay for Background -->
					<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
					</div>
					
					<div class="relative z-10 p-8">
						{#if currentPage}
							<div class="max-w-4xl">
																<!-- Header -->
								<div class="mb-8">
									<div class="flex items-center space-x-4 mb-4">
										<div>
											<img src={currentPage.icon} alt="{currentPage.title} logo" class="w-32 h-32" />
										</div>
										<div>
											<h1 class="text-white text-4xl font-bold mb-2">
												{currentPage.title}
											</h1>
											<p class="text-white/70 text-xl">
												{currentPage.description}
											</p>
											{#if currentPage.period}
												<p class="text-green-400 text-lg mt-1">
													{getStartDate(currentPage.period)}
												</p>
											{/if}
										</div>
									</div>
									
									<!-- Profile Image for About Me page -->
									{#if currentPage.slug === 'bio'}
										<div class="mt-8 text-center">
											<img src="/images/about/andy_profile.jpg" alt="Andy Pearson" class="w-96 h-96 mx-auto rounded-full object-cover shadow-lg" />
										</div>
									{/if}
								</div>

								<!-- Content -->
								<div class="prose prose-invert prose-lg max-w-none">
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
		color: rgb(229 231 235);
	}
	
	:global(.prose h1) {
		color: rgb(255 255 255);
	}
	
	:global(.prose h2) {
		color: rgb(255 255 255);
	}
	
	:global(.prose h3) {
		color: rgb(255 255 255);
	}
	
	:global(.prose strong) {
		color: rgb(74 222 128);
	}
	
	:global(.prose a) {
		color: rgb(74 222 128);
	}
	
	:global(.prose a:hover) {
		color: rgb(34 197 94);
	}
	
	:global(.prose ul) {
		color: rgb(229 231 235);
	}
	
	:global(.prose li) {
		color: rgb(229 231 235);
	}
	
	/* Hide scrollbars */
	.scrollbar-hide {
		-ms-overflow-style: none;  /* Internet Explorer 10+ */
		scrollbar-width: none;  /* Firefox */
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;  /* Safari and Chrome */
	}
</style> 