<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ websites } = data);
</script>

<svelte:head>
	<title>Showcase - Andy Pearson</title>
	<meta name="description" content="Explore the showcase of websites built and maintained by Andy Pearson, including community platforms and web applications." />
</svelte:head>

<div class="min-h-screen bg-[#677A67] pt-20">
	<Navigation />
	

	
	<!-- Showcase List -->
	<section class="py-20 bg-white">
		<div class="container-custom">
			<div class="space-y-32">
				{#each websites as website, index}
											<div class="card overflow-hidden">
						<div class="flex flex-col lg:flex-row">
							<!-- Image Section -->
							<div class="lg:w-1/2 {index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}">
								<div class="h-64 lg:h-full bg-gradient-to-br from-[#EAE6D8] to-[#E4EDEE] flex items-center justify-center">
									{#if website.image}
										<img 
											src={website.image} 
											alt="{website.title}" 
											class="w-full h-full object-cover"
										/>
									{:else}
										<div class="text-center">
											<span class="text-6xl mb-4 block">{website.icon}</span>
											<h3 class="text-3xl font-black text-[#434840] mb-2">
												{website.title}
											</h3>
											<span class="inline-block px-4 py-2 bg-[#677A67] text-white text-lg font-bold rounded-full">
												{website.status}
											</span>
										</div>
									{/if}
								</div>
							</div>
							
							<!-- Content Section -->
							<div class="lg:w-1/2 p-8 {index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}">
								<div class="h-full flex flex-col justify-center">
									<h3 class="text-4xl font-black text-[#434840] mb-4">
										{website.title}
									</h3>
									
									<p class="text-xl text-[#434840] mb-6 font-semibold">
										{website.description}
									</p>
									
									<!-- Tech Stack -->
									<div class="flex flex-wrap gap-2 mb-6">
										{#each website.tech as tech}
											<span class="px-4 py-2 bg-[#E4EDEE] text-[#434840] text-lg font-bold rounded-full font-mono">
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
											class="inline-flex items-center justify-center space-x-2 bg-[#677A67] text-white px-8 py-4 rounded-lg hover:bg-[#87A7AC] transition-colors duration-200 font-bold text-xl"
										>
											<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
											</svg>
											<span>Visit Site</span>
										</a>
										
										<a 
											href="/showcase/{website.slug}" 
											class="inline-flex items-center justify-center space-x-2 bg-[#EAE6D8] text-[#434840] px-8 py-4 rounded-lg hover:bg-[#E7A97F] hover:text-white transition-colors duration-200 font-bold text-xl"
										>
											<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
	<section class="py-20 bg-[#E4EDEE]">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-5xl font-black text-[#434840] mb-12">
					Showcase Stats
				</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="card text-center p-6 bg-white">
						<div class="text-5xl font-black text-[#677A67] mb-2">5</div>
						<div class="text-xl text-[#434840] font-bold">Active Websites</div>
					</div>
					<div class="card text-center p-6 bg-white">
						<div class="text-5xl font-black text-[#677A67] mb-2">10K+</div>
						<div class="text-xl text-[#434840] font-bold">Monthly Visitors</div>
					</div>
					<div class="card text-center p-6 bg-white">
						<div class="text-5xl font-black text-[#677A67] mb-2">99.9%</div>
						<div class="text-xl text-[#434840] font-bold">Uptime</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div> 