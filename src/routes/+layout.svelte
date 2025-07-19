<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	// Theme management
	let currentTheme = 'modern';
	
	$: {
		// Set theme based on current route
		const path = $page.url.pathname;
		if (path === '/') {
			currentTheme = 'modern';
		} else if (path.startsWith('/about')) {
			currentTheme = 'professional';
		} else if (path.startsWith('/projects')) {
			currentTheme = 'tech';
		} else if (path.startsWith('/websites')) {
			currentTheme = 'game';
		} else if (path.startsWith('/articles')) {
			currentTheme = 'retro';
		}
	}
	
	onMount(() => {
		// Add theme class to body
		document.body.className = `theme-${currentTheme}`;
	});
</script>

<svelte:head>
	<title>Andy Pearson - Portfolio</title>
	<meta name="description" content="Andy Pearson's personal portfolio website showcasing projects, websites, and articles" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
	<main>
		<slot />
	</main>
</div>

<style>
	:global(.theme-modern) {
		--theme-primary: theme('colors.modern.600');
		--theme-secondary: theme('colors.modern.400');
	}
	
	:global(.theme-professional) {
		--theme-primary: theme('colors.professional.600');
		--theme-secondary: theme('colors.professional.400');
	}
	
	:global(.theme-tech) {
		--theme-primary: theme('colors.tech.600');
		--theme-secondary: theme('colors.tech.400');
	}
	
	:global(.theme-game) {
		--theme-primary: theme('colors.game.600');
		--theme-secondary: theme('colors.game.400');
	}
	
	:global(.theme-retro) {
		--theme-primary: theme('colors.retro.600');
		--theme-secondary: theme('colors.retro.400');
	}
</style> 