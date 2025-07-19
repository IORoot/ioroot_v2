<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ websites } = data);
</script>

<svelte:head>
	<title>Websites - Andy Pearson</title>
	<meta name="description" content="Explore the websites built and maintained by Andy Pearson, including community platforms and web applications." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="green" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-green-700 to-green-800 dark:from-green-900 dark:to-green-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-white dark:text-green-100 mb-6">
					Websites
				</h1>
				<p class="text-xl text-green-50 dark:text-green-200 mb-8">
					Digital playgrounds and community spaces
				</p>
			</div>
		</div>
	</section>
	
	<!-- Websites List -->
	<section class="py-20 bg-gray-50 dark:bg-gray-900">
		<div class="container-custom">
			<div class="space-y-32">
				{#each websites as website, index}
											<div class="card overflow-hidden">
						<div class="flex flex-col lg:flex-row">
							<!-- Image Section -->
							<div class="lg:w-1/2 {index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}">
								<div class="h-64 lg:h-full bg-gradient-to-br from-green-700 to-green-800 dark:from-green-800 dark:to-green-900 flex items-center justify-center">
									{#if website.image}
										<img 
											src={website.image} 
											alt="{website.title}" 
											class="w-full h-full object-cover"
										/>
									{:else}
										<div class="text-center">
											<span class="text-6xl mb-4 block">{website.icon}</span>
											<h3 class="text-2xl font-bold text-white dark:text-green-100 mb-2">
												{website.title}
											</h3>
											<span class="inline-block px-3 py-1 bg-green-600 text-white dark:bg-green-700 dark:text-green-100 text-sm rounded-full">
												{website.status}
											</span>
										</div>
									{/if}
								</div>
							</div>
							
							<!-- Content Section -->
							<div class="lg:w-1/2 p-8 {index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}">
								<div class="h-full flex flex-col justify-center">
									<h3 class="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
										{website.title}
									</h3>
									
									<p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
										{website.description}
									</p>
									
									<!-- Tech Stack -->
									<div class="flex flex-wrap gap-2 mb-6">
										{#each website.tech as tech}
											<span class="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-sm rounded-full font-mono">
												{tech}
											</span>
										{/each}
									</div>
									
									<!-- Action Buttons -->
									<div class="flex flex-col sm:flex-row gap-4">
										<a 
											href={website.url} 
											target="_blank" 
											rel="noopener noreferrer"
											class="inline-flex items-center justify-center space-x-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 font-mono"
										>
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
											</svg>
											<span>Visit Site</span>
										</a>
										
										<a 
											href="/websites/{website.slug}" 
											class="inline-flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-mono"
										>
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
											</svg>
											<span>Learn More</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Stats Section -->
	<section class="py-20 bg-green-700 dark:bg-green-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-white dark:text-green-100 mb-12">
					Website Stats
				</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="card text-center p-6 bg-white dark:bg-green-800">
						<div class="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">5</div>
						<div class="text-green-600 dark:text-green-100">Active Websites</div>
					</div>
					<div class="card text-center p-6 bg-white dark:bg-green-800">
						<div class="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">10K+</div>
						<div class="text-green-600 dark:text-green-100">Monthly Visitors</div>
					</div>
					<div class="card text-center p-6 bg-white dark:bg-green-800">
						<div class="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">99.9%</div>
						<div class="text-green-600 dark:text-green-100">Uptime</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div> 