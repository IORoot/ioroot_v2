<script lang="ts">
	import { onMount } from 'svelte';
	
	let gridContainer: HTMLElement;
	let isShortScreen = false;
	
	function updateGridLayout() {
		if (gridContainer) {
			if (window.innerHeight <= 900) {
				gridContainer.style.gridTemplateRows = '0.1fr 0.1fr 1.8fr 1.8fr 1.8fr 1.8fr 1.8fr 0.8fr';
				isShortScreen = true;
			} else {
				gridContainer.style.gridTemplateRows = '0.7fr 0.7fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.5fr';
				isShortScreen = false;
			}
		}
	}
	

	
	onMount(() => {
		updateGridLayout();
		window.addEventListener('resize', updateGridLayout);
		
		return () => {
			window.removeEventListener('resize', updateGridLayout);
		};
	});
	
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

	let logoContainer: HTMLElement;
	let emailIcon: HTMLElement;
	let githubIcon: HTMLElement;
	let linkedinIcon: HTMLElement;

	function animateLogo() {
		if (!logoContainer) {
			return;
		}

		// Try to import GSAP dynamically
		import('gsap').then(gsapModule => {
			const gsap = gsapModule.gsap;

			// Get the logo elements
			const iElement = logoContainer.querySelector('#I');
			const oElement = logoContainer.querySelector('#O');
			const slashElement = logoContainer.querySelector('#Line');

			if (!iElement || !oElement || !slashElement) {
				return;
			}

			// Store original positions
			const originalIPos = iElement.getAttribute('x');
			const originalOPos = oElement.getAttribute('x');
			const originalSlashPos = slashElement.getAttribute('x1');

			// Create timeline
			const tl = gsap.timeline();

			// Terminal cursor effect - the slash blinks like a cursor
			tl.to(slashElement, {
				opacity: 0,
				duration: 0.1,
				repeat: 3,
				yoyo: true,
				ease: "none"
			})
			// Move cursor (slash) to the right to delete O
			.to(slashElement, {
				x: "-=32",
				duration: 0.2,
				ease: "power2.out"
			})
			// Delete O (make it disappear)
			.to(oElement, {
				opacity: 0,
				duration: 0.1,
				ease: "none"
			})
			// Move cursor further right to delete I
			.to(slashElement, {
				x: "-=8",
				duration: 0.2,
				ease: "power2.out"
			})
			// Delete I (make it disappear)
			.to(iElement, {
				opacity: 0,
				duration: 0.1,
				ease: "none"
			})
			// Wait a moment
			.to({}, { duration: 0.5 })
			// Move cursor back to original position
			.to(slashElement, {
				x: "+=40",
				duration: 0.3,
				ease: "power2.out"
			})
			// Type I back (make it appear)
			.to(iElement, {
				opacity: 1,
				duration: 0.1,
				ease: "none"
			})
			// Move cursor right to type O
			.to(slashElement, {
				x: "+=32",
				duration: 0.2,
				ease: "power2.out"
			})
			// Type O back (make it appear)
			.to(oElement, {
				opacity: 1,
				duration: 0.1,
				ease: "none"
			})
			// Move cursor back to original position
			.to(slashElement, {
				x: originalSlashPos,
				duration: 0.2,
				ease: "power2.out"
			});

			// Animation timeline created
		}).catch(error => {
			console.error('Failed to load GSAP:', error);
		});
	}

	function animateEmail() {
		import('gsap').then(gsapModule => {
			const gsap = gsapModule.gsap;
			if (!emailIcon) return;

			// Kill any existing animations
			gsap.killTweensOf(emailIcon);
			
			const tl = gsap.timeline();
			
			// Envelope hops around and opens
			tl.to(emailIcon, {
				y: -20,
				rotation: 15,
				duration: 0.2,
				ease: "bounce.out"
			})
			.to(emailIcon, {
				y: 0,
				rotation: -15,
				duration: 0.2,
				ease: "bounce.out"
			})
			.to(emailIcon, {
				y: -10,
				rotation: 0,
				duration: 0.2,
				ease: "bounce.out"
			})
			// Open envelope (scale the top part)
			.to(emailIcon.querySelector('path'), {
				scaleY: 1.2,
				transformOrigin: "top center",
				duration: 0.3,
				ease: "power2.out"
			})
			.to(emailIcon.querySelector('path'), {
				scaleY: 1,
				duration: 0.3,
				ease: "power2.out"
			});
		});
	}

	function animateGitHub() {
		import('gsap').then(gsapModule => {
			const gsap = gsapModule.gsap;
			if (!githubIcon) return;

			// Kill any existing animations
			gsap.killTweensOf(githubIcon);
			
			const tl = gsap.timeline();
			
			// Octocat wags tail and waves
			tl.to(githubIcon, {
				rotation: 10,
				duration: 0.1,
				ease: "power2.out"
			})
			.to(githubIcon, {
				rotation: -10,
				duration: 0.1,
				ease: "power2.out"
			})
			.to(githubIcon, {
				rotation: 5,
				duration: 0.1,
				ease: "power2.out"
			})
			.to(githubIcon, {
				rotation: -5,
				duration: 0.1,
				ease: "power2.out"
			})
			.to(githubIcon, {
				rotation: 0,
				duration: 0.1,
				ease: "power2.out"
			})
			// Wave effect
			.to(githubIcon, {
				scale: 1.1,
				duration: 0.2,
				ease: "power2.out"
			})
			.to(githubIcon, {
				scale: 1,
				duration: 0.2,
				ease: "power2.out"
			});
		});
	}

	function animateLinkedIn() {
		import('gsap').then(gsapModule => {
			const gsap = gsapModule.gsap;
			if (!linkedinIcon) return;

			// Kill any existing animations
			gsap.killTweensOf(linkedinIcon);
			
			const tl = gsap.timeline();
			
			// LinkedIn spins and waves
			tl.to(linkedinIcon, {
				rotation: 360,
				duration: 0.6,
				ease: "power2.out"
			})
			.to(linkedinIcon, {
				scale: 1.15,
				duration: 0.2,
				ease: "power2.out"
			})
			.to(linkedinIcon, {
				scale: 1,
				duration: 0.2,
				ease: "power2.out"
			});
		});
	}
</script>

<svelte:head>
	<title>Andy Pearson - Full-Stack Developer & Parkour Enthusiast</title>
	<meta name="description" content="Personal portfolio of Andy Pearson, showcasing web development projects and case studies about technology and parkour." />
</svelte:head>

<div class="min-h-screen bg-[#EAE6D8]">
	<!-- Full Screen Bento Box Layout -->
	<div class="h-screen p-4 md:p-8">
		<div class="h-full grid grid-cols-12 grid-rows-8 gap-4 md:gap-6 w-full" bind:this={gridContainer}>
			
			<!-- Company Logo Box - Spans 4 columns, 4 rows (square) - Hidden on mobile -->
			<div class="hidden md:block col-span-6 md:col-span-4 row-span-4 rounded-3xl shadow-xl p-8 flex flex-col justify-center relative overflow-hidden" style="background-color: #1a1a1a;" bind:this={logoContainer} on:mouseenter={animateLogo}>
				<!-- Film Grain Overlay -->
				<div class="absolute inset-0 opacity-20">
					<img src="/images/bento/film-grain.svg" alt="" class="w-full h-full object-cover" />
				</div>
				<!-- 8px Grid Overlay -->
				<div class="absolute inset-0 opacity-15" style="background-image: linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
				</div>
				<div class="text-center relative z-10">
					<div class="w-4/5 h-auto mx-auto filter brightness-0 invert" style="aspect-ratio: 1/1;">
						<svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<defs>
								<rect id="path-1" x="0" y="0" width="24" height="40"></rect>
							</defs>
							<g id="favicon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<rect id="I" fill="#757575" x="8" y="30" width="8" height="40"></rect>
								<rect id="O" fill="#757575" x="24" y="30" width="32" height="40"></rect>
								<g id="/" transform="translate(62.000000, 30.000000)">
									<mask id="mask-2" fill="white">
										<use xlink:href="#path-1"></use>
									</mask>
									<use id="Rectangle" fill-opacity="0" fill="#FFFFFF" xlink:href="#path-1"></use>
									<line x1="4.5" y1="40" x2="20.5" y2="0" id="Line" stroke="#757575" stroke-width="8" stroke-linecap="square" mask="url(#mask-2)"></line>
								</g>
							</g>
						</svg>
					</div>
				</div>
			</div>
			
			<!-- Hero Section - Spans 8 columns, 4 rows on desktop, full width on mobile -->
			<div class="col-span-12 md:col-span-8 row-span-4 bg-gradient-to-br from-white to-[#EAE6D8] rounded-3xl shadow-xl p-8 flex flex-col justify-center relative overflow-hidden" style="background-image: url('/images/bento/hero-bg.jpg'), url('/images/bento/hero-bg.svg'); background-size: cover; background-position: center;">
				<!-- Film Grain Overlay -->
				<div class="absolute inset-0 opacity-25" style="background-image: url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><filter id=&quot;noise&quot;><feTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;1.2&quot; numOctaves=&quot;3&quot; stitchTiles=&quot;stitch&quot;/></filter><rect width=&quot;100%&quot; height=&quot;100%&quot; filter=&quot;url(%23noise)&quot; opacity=&quot;0.8&quot;/></svg>'); background-size: 100px 100px; background-repeat: repeat;">
				</div>
				<!-- Golden Ratio Grid Overlay -->
				<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(184, 134, 11, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 134, 11, 0.6) 1px, transparent 1px); background-size: 61.8px 61.8px, 61.8px 61.8px;">
				</div>
				<div class="text-center relative z-10">
					<h1 class="text-4xl-vh md:text-6xl-vh font-black text-[#434840] {isShortScreen ? 'mb-2' : 'mb-8'}">
						Andy Pearson
					</h1>
					<p class="text-xl-vh md:text-2xl-vh font-black text-[#87A7AC] {isShortScreen ? 'mb-2' : 'mb-8'}">
						Lead DevOps Engineer & Parkour Coach
					</p>
					<div class="flex flex-wrap gap-2 md:gap-4 justify-center">
						<span class="px-3 py-1 md:px-6 md:py-3 bg-[#677A67] text-white rounded-full text-xs md:text-base-vh lg:text-lg-vh font-medium">
							DevOps Engineer
						</span>
						<span class="px-3 py-1 md:px-6 md:py-3 bg-[#E7A97F] text-white rounded-full text-xs md:text-base-vh lg:text-lg-vh font-medium">
							Parkour Coach
						</span>
						<span class="px-3 py-1 md:px-6 md:py-3 bg-[#87A7AC] text-white rounded-full text-xs md:text-base-vh lg:text-lg-vh font-medium">
							Project Developer
						</span>
					</div>
				</div>
			</div>
			
			<!-- About Me - Spans 4 columns, dynamic rows -->
			<a href="/about" class="col-span-12 md:col-span-4 bg-gradient-to-br from-[#677A67] to-[#677A67] rounded-3xl shadow-xl p-6 flex flex-col justify-start text-white relative overflow-hidden" style="grid-row: span {isShortScreen ? 3 : 2};" on:mouseenter={(e) => { e.currentTarget.querySelector('video')?.play(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { e.currentTarget.querySelector('video')?.pause(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1)'; }}>
				<!-- Video Background -->
				<video class="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline style="min-width: 100%; min-height: 100%; width: auto; height: auto; object-position: center;">
					<source src="/video/jump.mp4" type="video/mp4">
				</video>
				<div class="text-left relative z-10 h-full flex flex-col justify-start">
					<h2 class="text-4xl-vh md:text-6xl-vh font-black mb-2 text-white leading-tight">About Me</h2>
					<p class="text-sm-vh md:text-base-vh font-bold text-white">Background, experience & skills</p>
				</div>
			</a>
			
			<!-- Projects - Spans 4 columns, dynamic rows -->
			<a href="/projects" class="col-span-12 md:col-span-4 bg-gradient-to-br from-[#E7A97F] to-[#E7A97F] rounded-3xl shadow-xl p-6 flex flex-col justify-start text-white relative overflow-hidden" style="grid-row: span {isShortScreen ? 3 : 2};" on:mouseenter={(e) => { e.currentTarget.querySelector('video')?.play(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { e.currentTarget.querySelector('video')?.pause(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1)'; }}>
				<!-- Video Background -->
				<video class="absolute bottom-0 left-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline style="min-width: 100%; min-height: 100%; width: auto; height: auto;">
					<source src="/video/system.mp4" type="video/mp4">
				</video>
				<div class="text-left relative z-10 h-full flex flex-col justify-start">
					<h2 class="text-4xl-vh md:text-6xl-vh font-black mb-2 text-white leading-tight">Projects</h2>
					<p class="text-sm-vh md:text-base-vh font-bold text-white">Coding projects & technical work</p>
				</div>
			</a>
			
			<!-- Showcase - Spans 4 columns, dynamic rows -->
			<a href="/showcase" class="col-span-12 md:col-span-4 bg-gradient-to-br from-[#EAE6D8] to-[#EAE6D8] rounded-3xl shadow-xl p-6 flex flex-col justify-start text-[#434840] relative overflow-hidden" style="grid-row: span {isShortScreen ? 3 : 2};" on:mouseenter={(e) => { e.currentTarget.querySelector('video')?.play(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1.1)'; }} on:mouseleave={(e) => { e.currentTarget.querySelector('video')?.pause(); const video = e.currentTarget.querySelector('video'); if (video) video.style.transform = 'scale(1)'; }}>
				<!-- Video Background -->
				<video class="absolute bottom-0 left-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-out" muted loop playsinline style="min-width: 100%; min-height: 100%; width: auto; height: auto;">
					<source src="/video/smoke.mp4" type="video/mp4">
				</video>
				<!-- Image Overlay -->
				<div class="text-left relative z-10 h-full flex flex-col justify-start">
					<h2 class="text-4xl-vh md:text-6xl-vh font-black mb-2 text-white leading-tight">Showcase</h2>
					<p class="text-sm-vh md:text-base-vh font-bold text-white">Sites, Builds, Articles & Designs</p>
				</div>
			</a>
			
			<!-- Email Contact - Spans 2 columns, 2 rows -->
			<a href="mailto:{contactInfo.email}" class="col-span-4 md:col-span-2 row-span-2 bg-gradient-to-br from-[#E7A97F] to-[#E7A97F] rounded-3xl shadow-xl p-3 md:p-6 flex flex-col items-center justify-center text-white">
				<svg bind:this={emailIcon} on:mouseenter={animateEmail} class="{isShortScreen ? 'w-32 h-32' : 'w-24 h-24'}" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
				</svg>
			</a>
			
			<!-- GitHub Contact - Spans 2 columns, 2 rows -->
			<a href={contactInfo.github} target="_blank" rel="noopener noreferrer" class="col-span-4 md:col-span-2 row-span-2 bg-gradient-to-br from-[#677A67] to-[#677A67] rounded-3xl shadow-xl p-3 md:p-6 flex flex-col items-center justify-center text-white">
				<svg bind:this={githubIcon} on:mouseenter={animateGitHub} class="{isShortScreen ? 'w-32 h-32' : 'w-24 h-24'}" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
			</a>
			
			<!-- LinkedIn Contact - Spans 2 columns, 2 rows -->
			<a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" class="col-span-4 md:col-span-2 row-span-2 bg-gradient-to-br from-[#87A7AC] to-[#87A7AC] rounded-3xl shadow-xl p-3 md:p-6 flex flex-col items-center justify-center text-white">
				<svg bind:this={linkedinIcon} on:mouseenter={animateLinkedIn} class="{isShortScreen ? 'w-32 h-32' : 'w-24 h-24'}" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
			</a>
			
		</div>
	</div>
</div> 