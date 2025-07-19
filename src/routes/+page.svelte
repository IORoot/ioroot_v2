<script>
	import Navigation from '$lib/components/Navigation.svelte';
	
	// Mock data for latest content
	const latestContent = [
		{
			type: 'project',
			title: 'AI Chat Interface',
			description: 'A modern chat interface built with React and OpenAI API',
			icon: '🤖',
			href: '/projects/ai-chat',
			date: '2024-01-15'
		},
		{
			type: 'website',
			title: 'LondonParkour.com',
			description: 'Community website for London parkour scene',
			icon: '🏃‍♂️',
			href: '/websites/londonparkour',
			date: '2024-01-10'
		},
		{
			type: 'article',
			title: 'Building High-Performance Web Apps',
			description: 'Tips and tricks for optimizing your web applications',
			icon: '⚡',
			href: '/articles/performance-tips',
			date: '2024-01-05'
		}
	];
	
	const heroSlides = [
		{
			title: 'Full-Stack Developer',
			subtitle: 'Building modern web experiences',
			image: '/images/hero-1.jpg',
			cta: 'View Projects'
		},
		{
			title: 'Parkour Enthusiast',
			subtitle: 'Exploring movement and community',
			image: '/images/hero-2.jpg',
			cta: 'Learn More'
		}
	];
	
	let currentSlide = 0;
	
	// Auto-advance slides
	setInterval(() => {
		currentSlide = (currentSlide + 1) % heroSlides.length;
	}, 5000);
</script>

<svelte:head>
	<title>Andy Pearson - Full-Stack Developer & Parkour Enthusiast</title>
	<meta name="description" content="Personal portfolio of Andy Pearson, showcasing web development projects, websites, and articles about technology and parkour." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="modern" />
	
	<!-- Hero Section -->
	<section class="relative h-screen flex items-center justify-center overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-br from-modern-50 to-modern-100 dark:from-modern-900 dark:to-modern-800"></div>
		
		<!-- Grid Background -->
		<div class="absolute inset-0 opacity-10">
			<div class="absolute inset-0" style="background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
		</div>
		
		<div class="relative z-10 text-center max-w-4xl mx-auto px-4">
			<h1 class="text-6xl md:text-8xl font-bold text-modern-800 dark:text-modern-200 mb-6">
				Andy Pearson
			</h1>
			<p class="text-xl md:text-2xl text-modern-600 dark:text-modern-400 mb-8">
				Full-Stack Developer & Parkour Enthusiast
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/projects" class="btn btn-primary bg-modern-600 hover:bg-modern-700">
					View Projects
				</a>
				<a href="/about" class="btn btn-secondary">
					About Me
				</a>
			</div>
		</div>
	</section>
	
	<!-- Latest Content Section -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<h2 class="text-4xl font-bold text-center text-modern-800 dark:text-modern-200 mb-12">
				Latest Content
			</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each latestContent as item}
					<a href={item.href} class="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
						<div class="p-6">
							<div class="flex items-center space-x-3 mb-4">
								<span class="text-3xl">{item.icon}</span>
								<span class="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
							</div>
							<h3 class="text-xl font-semibold text-modern-800 dark:text-modern-200 mb-2 group-hover:text-modern-600 dark:group-hover:text-modern-400">
								{item.title}
							</h3>
							<p class="text-gray-600 dark:text-gray-400">
								{item.description}
							</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Quick Links Section -->
	<section class="py-20 bg-modern-50 dark:bg-modern-900">
		<div class="container-custom">
			<h2 class="text-4xl font-bold text-center text-modern-800 dark:text-modern-200 mb-12">
				Explore
			</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<a href="/about" class="card text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
					<div class="text-4xl mb-4">👤</div>
					<h3 class="text-xl font-semibold text-modern-800 dark:text-modern-200 mb-2">About Me</h3>
					<p class="text-gray-600 dark:text-gray-400">Learn about my background, skills, and experience</p>
				</a>
				
				<a href="/projects" class="card text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
					<div class="text-4xl mb-4">💻</div>
					<h3 class="text-xl font-semibold text-modern-800 dark:text-modern-200 mb-2">Projects</h3>
					<p class="text-gray-600 dark:text-gray-400">Explore my coding projects and technical work</p>
				</a>
				
				<a href="/websites" class="card text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
					<div class="text-4xl mb-4">🌐</div>
					<h3 class="text-xl font-semibold text-modern-800 dark:text-modern-200 mb-2">Websites</h3>
					<p class="text-gray-600 dark:text-gray-400">Check out the websites I've built and maintain</p>
				</a>
				
				<a href="/articles" class="card text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
					<div class="text-4xl mb-4">📝</div>
					<h3 class="text-xl font-semibold text-modern-800 dark:text-modern-200 mb-2">Articles</h3>
					<p class="text-gray-600 dark:text-gray-400">Read my thoughts on tech, parkour, and more</p>
				</a>
			</div>
		</div>
	</section>
</div> 