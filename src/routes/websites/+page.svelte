<script>
	import Navigation from '$lib/components/Navigation.svelte';
	
	const websites = [
		{
			title: 'LondonParkour.com',
			description: 'Community website for London parkour scene with event listings, training spots, and community features.',
			url: 'https://londonparkour.com',
			image: '/images/londonparkour.jpg',
			tech: ['React', 'Next.js', 'MongoDB', 'Vercel'],
			status: 'Live',
			icon: '🏃‍♂️'
		},
		{
			title: 'IORoot.com',
			description: 'Personal portfolio and blog showcasing web development projects and technical articles.',
			url: 'https://ioroot.com',
			image: '/images/ioroot.jpg',
			tech: ['SvelteKit', 'Tailwind CSS', 'MDX'],
			status: 'Live',
			icon: '🚀'
		},
		{
			title: 'RF-1.com',
			description: 'Racing game website with leaderboards, track information, and community features.',
			url: 'https://rf-1.com',
			image: '/images/rf-1.jpg',
			tech: ['Vue.js', 'Node.js', 'PostgreSQL'],
			status: 'Live',
			icon: '🏎️'
		},
		{
			title: 'SVGEncode.com',
			description: 'Online tool for encoding SVG files to data URLs and optimizing web graphics.',
			url: 'https://svgencode.com',
			image: '/images/svgencode.jpg',
			tech: ['Vanilla JS', 'HTML5', 'CSS3'],
			status: 'Live',
			icon: '🎨'
		},
		{
			title: 'HouseQuests.com',
			description: 'Interactive platform for creating and sharing house hunting challenges and adventures.',
			url: 'https://housequests.com',
			image: '/images/housequests.jpg',
			tech: ['React', 'Firebase', 'Google Maps API'],
			status: 'Live',
			icon: '🏠'
		}
	];
</script>

<svelte:head>
	<title>Websites - Andy Pearson</title>
	<meta name="description" content="Explore the websites built and maintained by Andy Pearson, including community platforms and web applications." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="green" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-green-800 dark:text-green-200 mb-6">
					Websites
				</h1>
				<p class="text-xl text-green-600 dark:text-green-400 mb-8">
					Digital playgrounds and community spaces
				</p>
			</div>
		</div>
	</section>
	
	<!-- Websites Grid -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each websites as website}
					<div class="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 dark:border-green-700">
						<div class="p-6">
							<!-- Header -->
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-center space-x-3">
									<span class="text-3xl">{website.icon}</span>
									<div>
										<h3 class="text-xl font-bold text-green-800 dark:text-green-200 group-hover:text-green-600 dark:group-hover:text-green-400">
											{website.title}
										</h3>
										<span class="inline-block px-2 py-1 bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 text-xs rounded-full">
											{website.status}
										</span>
									</div>
								</div>
							</div>
							
							<!-- Description -->
							<p class="text-gray-600 dark:text-gray-400 mb-4">
								{website.description}
							</p>
							
							<!-- Tech Stack -->
							<div class="flex flex-wrap gap-2 mb-4">
								{#each website.tech as tech}
									<span class="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 text-xs rounded-full font-mono">
										{tech}
									</span>
								{/each}
							</div>
							
							<!-- Visit Button -->
							<a 
								href={website.url} 
								target="_blank" 
								rel="noopener noreferrer"
								class="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-mono"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
								</svg>
								<span>Visit Site</span>
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Stats Section -->
	<section class="py-20 bg-green-50 dark:bg-green-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-green-800 dark:text-green-200 mb-12">
					Website Stats
				</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="card text-center p-6">
						<div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">5</div>
						<div class="text-green-700 dark:text-green-300">Active Websites</div>
					</div>
					<div class="card text-center p-6">
						<div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10K+</div>
						<div class="text-green-700 dark:text-green-300">Monthly Visitors</div>
					</div>
					<div class="card text-center p-6">
						<div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
						<div class="text-green-700 dark:text-green-300">Uptime</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div> 