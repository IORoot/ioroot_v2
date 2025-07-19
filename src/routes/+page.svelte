<script>
	import Navigation from '$lib/components/Navigation.svelte';
	
	const contactInfo = {
		email: 'contact@londonparkour.com',
		github: 'https://github.com/ioroot',
		instagram: 'https://www.instagram.com/andy_n_p/',
		youtube: 'https://www.youtube.com/@AndyPearson',
		linkedin: 'https://www.linkedin.com/in/londonparkour/',
		facebook: 'https://www.facebook.com/ldnpk',
		londonparkour: 'https://www.instagram.com/london_parkour/',
		iorootmedia: 'https://www.youtube.com/@iorootmedia',
		londonparkour_web: 'https://www.google.com/search?q=londonparkour'
	};
</script>

<svelte:head>
	<title>Andy Pearson - Full-Stack Developer & Parkour Enthusiast</title>
	<meta name="description" content="Personal portfolio of Andy Pearson, showcasing web development projects, websites, and articles about technology and parkour." />
</svelte:head>

<div class="min-h-screen bg-[#EAE6D8]">
	
	<!-- Full Screen Bento Box Layout -->
	<div class="h-screen p-4 md:p-8">
		<div class="h-full grid grid-cols-12 grid-rows-6 gap-4 md:gap-6 w-full" style="grid-template-rows: 0.7fr 1fr 1fr 1fr 1fr 2fr;">
			
			<!-- Company Logo Box - Spans 4 columns, 4 rows (square) -->
			<div class="col-span-6 md:col-span-4 row-span-4 bg-gradient-to-br from-[#87A7AC] to-[#87A7AC] rounded-3xl shadow-xl p-8 flex flex-col justify-center relative overflow-hidden" style="background-image: url('/images/bento/logo-bg.jpg'), url('/images/bento/logo-bg.svg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
				<div class="text-center relative z-10">
					<img src="/images/logo/logo.svg" alt="Company Logo" class="w-4/5 h-auto mx-auto filter brightness-0 invert" style="aspect-ratio: 1/1;" />
				</div>
			</div>
			
			<!-- Hero Section - Spans 8 columns, 4 rows -->
			<div class="col-span-6 md:col-span-8 row-span-4 bg-gradient-to-br from-white to-[#EAE6D8] rounded-3xl shadow-xl p-8 flex flex-col justify-center relative overflow-hidden" style="background-image: url('/images/bento/hero-bg.jpg'), url('/images/bento/hero-bg.svg'); background-size: cover; background-position: center;">
				<div class="text-center relative z-10">
					<h1 class="text-6xl md:text-9xl font-black text-[#434840] mb-8">
						Andy Pearson
					</h1>
					<p class="text-3xl md:text-5xl font-black text-[#87A7AC] mb-8">
						Lead DevOps Engineer & Parkour Coach
					</p>
					<div class="flex flex-wrap gap-4 justify-center">
						<span class="px-6 py-3 bg-[#677A67] text-white rounded-full text-xl md:text-2xl font-black">
							DevOps Expert
						</span>
						<span class="px-6 py-3 bg-[#E7A97F] text-white rounded-full text-xl md:text-2xl font-black">
							Parkour Coach
						</span>
						<span class="px-6 py-3 bg-[#87A7AC] text-white rounded-full text-xl md:text-2xl font-black">
							Full-Stack Dev
						</span>
					</div>
				</div>
			</div>
			
			<!-- About Me - Spans 4 columns, 2 rows -->
			<a href="/about" class="col-span-6 md:col-span-4 row-span-2 bg-gradient-to-br from-[#677A67] to-[#677A67] rounded-3xl shadow-xl p-6 flex flex-col justify-center text-white hover:scale-105 transition-transform duration-300 relative overflow-hidden" style="background-image: url('/images/bento/about-bg.jpg'), url('/images/bento/about-bg.svg'); background-size: cover; background-position: center;">
				<div class="text-center relative z-10">
					<h2 class="text-3xl md:text-9xl font-black mb-4 text-white">About Me</h2>
					<p class="text-lg md:text-xl font-bold text-white">Background, experience & skills</p>
				</div>
			</a>
			
			<!-- Projects - Spans 4 columns, 2 rows -->
			<a href="/projects" class="col-span-6 md:col-span-4 row-span-2 bg-gradient-to-br from-[#E7A97F] to-[#E7A97F] rounded-3xl shadow-xl p-6 flex flex-col justify-center text-white hover:scale-105 transition-transform duration-300 relative overflow-hidden" style="background-image: url('/images/bento/projects-bg.jpg'), url('/images/bento/projects-bg.svg'); background-size: cover; background-position: center;">
				<div class="text-center relative z-10">
					<h2 class="text-3xl md:text-9xl font-black mb-4 text-white">Projects</h2>
					<p class="text-lg md:text-xl font-bold text-white">Coding projects & technical work</p>
				</div>
			</a>
			
			<!-- Websites - Spans 4 columns, 2 rows -->
			<a href="/websites" class="col-span-6 md:col-span-4 row-span-2 bg-gradient-to-br from-[#EAE6D8] to-[#EAE6D8] rounded-3xl shadow-xl p-6 flex flex-col justify-center text-[#434840] hover:scale-105 transition-transform duration-300 relative overflow-hidden" style="background-image: url('/images/bento/websites-bg.jpg'), url('/images/bento/websites-bg.svg'); background-size: cover; background-position: center;">
				<div class="text-center relative z-10">
					<h2 class="text-3xl md:text-9xl font-black mb-4 text-white">Websites</h2>
					<p class="text-lg md:text-xl font-bold text-white">Sites I've built & maintain</p>
				</div>
			</a>
			
			<!-- Articles - Spans 6 columns, 2 rows -->
			<a href="/articles" class="col-span-6 md:col-span-6 row-span-2 bg-gradient-to-br from-[#E4EDEE] to-[#E4EDEE] rounded-3xl shadow-xl p-6 flex flex-col justify-center text-white hover:scale-105 transition-transform duration-300 relative overflow-hidden" style="background-image: url('/images/bento/articles-bg.jpg'), url('/images/bento/articles-bg.svg'); background-size: cover; background-position: center;">
				<div class="text-center relative z-10">
					<h2 class="text-3xl md:text-5xl font-black mb-4">Articles</h2>
					<p class="text-lg md:text-xl font-bold">Tech, parkour & insights</p>
				</div>
			</a>
			
			<!-- Contact Box - Spans 6 columns, 2 rows -->
			<div class="col-span-6 md:col-span-6 row-span-2 bg-gradient-to-br from-white to-[#EAE6D8] rounded-3xl shadow-xl p-6 relative overflow-hidden" style="background-image: url('/images/bento/contact-bg.jpg'), url('/images/bento/contact-bg.svg'); background-size: cover; background-position: center;">
				<div class="relative z-10 h-full">
					<div class="grid grid-cols-3 grid-rows-3 gap-2 h-full">
						<a href="mailto:{contactInfo.email}" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#E7A97F] hover:text-white transition-colors">
							<p class="text-sm font-bold">Email</p>
						</a>
						<a href={contactInfo.github} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#677A67] hover:text-white transition-colors">
							<p class="text-sm font-bold">GitHub</p>
						</a>
						<a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#87A7AC] hover:text-white transition-colors">
							<p class="text-sm font-bold">Instagram</p>
						</a>
						<a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#E7A97F] hover:text-white transition-colors">
							<p class="text-sm font-bold">YouTube</p>
						</a>
						<a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#677A67] hover:text-white transition-colors">
							<p class="text-sm font-bold">LinkedIn</p>
						</a>
						<a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#87A7AC] hover:text-white transition-colors">
							<p class="text-sm font-bold">Facebook</p>
						</a>
						<a href={contactInfo.londonparkour} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#E7A97F] hover:text-white transition-colors">
							<p class="text-sm font-bold">LondonParkour</p>
						</a>
						<a href={contactInfo.iorootmedia} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#677A67] hover:text-white transition-colors">
							<p class="text-sm font-bold">IORoot Media</p>
						</a>
						<a href={contactInfo.londonparkour_web} target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center p-2 bg-[#434840]/90 text-white rounded-lg hover:bg-[#87A7AC] hover:text-white transition-colors">
							<p class="text-sm font-bold">LondonParkour Web</p>
						</a>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div> 