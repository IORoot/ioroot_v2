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
		<div class="h-full grid grid-cols-12 grid-rows-8 gap-4 md:gap-6 w-full" style="grid-template-rows: 0.7fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;">
			
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
			<a href="/about" class="col-span-6 md:col-span-4 row-span-2 bg-gradient-to-br from-[#677A67] to-[#677A67] rounded-3xl shadow-xl p-6 flex flex-col justify-start text-white relative overflow-hidden" on:mouseenter={(e) => { e.currentTarget.querySelector('video')?.play(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { e.currentTarget.querySelector('video')?.pause(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1)'; }}>
				<!-- Video Background -->
				<video class="absolute bottom-0 left-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline style="min-width: 100%; min-height: 100%; width: auto; height: auto;">
					<source src="/video/mobieus.mp4" type="video/mp4">
				</video>
				<div class="text-left relative z-10">
					<h2 class="text-3xl md:text-9xl font-black mb-4 text-white">About Me</h2>
					<p class="text-lg md:text-xl font-bold text-white">Background, experience & skills</p>
				</div>
			</a>
			
			<!-- Projects - Spans 4 columns, 2 rows -->
			<a href="/projects" class="col-span-6 md:col-span-4 row-span-2 bg-gradient-to-br from-[#E7A97F] to-[#E7A97F] rounded-3xl shadow-xl p-6 flex flex-col justify-start text-white relative overflow-hidden" on:mouseenter={(e) => { e.currentTarget.querySelector('video')?.play(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { e.currentTarget.querySelector('video')?.pause(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1)'; }}>
				<!-- Video Background -->
				<video class="absolute bottom-0 left-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline style="min-width: 100%; min-height: 100%; width: auto; height: auto;">
					<source src="/video/system.mp4" type="video/mp4">
				</video>
				<div class="text-left relative z-10">
					<h2 class="text-3xl md:text-9xl font-black mb-4 text-white">Projects</h2>
					<p class="text-lg md:text-xl font-bold text-white">Coding projects & technical work</p>
				</div>
			</a>
			
			<!-- Websites - Spans 4 columns, 2 rows -->
			<a href="/websites" class="col-span-6 md:col-span-4 row-span-2 bg-gradient-to-br from-[#EAE6D8] to-[#EAE6D8] rounded-3xl shadow-xl p-6 flex flex-col justify-start text-[#434840] relative overflow-hidden" on:mouseenter={(e) => { e.currentTarget.querySelector('video')?.play(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { e.currentTarget.querySelector('video')?.pause(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1)'; }}>
				<!-- Video Background -->
				<video class="absolute bottom-0 left-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline style="min-width: 100%; min-height: 100%; width: auto; height: auto;">
					<source src="/video/smoke.mp4" type="video/mp4">
				</video>
				<!-- Image Overlay -->
				<div class="text-left relative z-10">
					<h2 class="text-3xl md:text-9xl font-black mb-4 text-white">Websites</h2>
					<p class="text-lg md:text-xl font-bold text-white">Sites I've built & maintain</p>
				</div>
			</a>
			
			<!-- Articles - Spans 6 columns, 2 rows -->
			<a href="/articles" class="col-span-6 md:col-span-6 row-span-2 bg-gradient-to-br from-[#E4EDEE] to-[#E4EDEE] rounded-3xl shadow-xl p-6 flex flex-col justify-center text-white relative overflow-hidden" on:mouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.pause(); if (video) video.style.transform = 'scale(1)'; }}>
				<video class="absolute bottom-0 left-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline>
					<source src="/video/library.mp4" type="video/mp4" />
				</video>
				<div class="absolute inset-0 bg-black bg-opacity-30"></div>
				<div class="text-center relative z-10">
					<h2 class="text-3xl md:text-5xl font-black mb-4">Articles</h2>
					<p class="text-lg md:text-xl font-bold">Tech, parkour & insights</p>
				</div>
			</a>
			
			<!-- Email Contact - Spans 2 columns, 2 rows -->
			<a href="mailto:{contactInfo.email}" class="col-span-6 md:col-span-2 row-span-2 bg-gradient-to-br from-[#E7A97F] to-[#E7A97F] rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center text-white">
				<svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
				</svg>
				<p class="text-lg font-bold">Email</p>
			</a>
			
			<!-- GitHub Contact - Spans 2 columns, 2 rows -->
			<a href={contactInfo.github} target="_blank" rel="noopener noreferrer" class="col-span-6 md:col-span-2 row-span-2 bg-gradient-to-br from-[#677A67] to-[#677A67] rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center text-white">
				<svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				<p class="text-lg font-bold">GitHub</p>
			</a>
			
			<!-- LinkedIn Contact - Spans 2 columns, 2 rows -->
			<a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" class="col-span-6 md:col-span-2 row-span-2 bg-gradient-to-br from-[#87A7AC] to-[#87A7AC] rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center text-white">
				<svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
				<p class="text-lg font-bold">LinkedIn</p>
			</a>
			
		</div>
	</div>
</div> 