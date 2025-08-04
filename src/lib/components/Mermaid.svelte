<script lang="ts">
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';
	
	export let chart: string;
	export let id: string;
	
	let container: HTMLElement;
	
	onMount(async () => {
		// Initialize mermaid
		mermaid.initialize({
			startOnLoad: false,
			theme: 'default',
			themeVariables: {
				primaryColor: '#677A67',
				primaryTextColor: '#434840',
				primaryBorderColor: '#87A7AC',
				lineColor: '#E7A97F',
				secondaryColor: '#EAE6D8',
				tertiaryColor: '#E4EDEE'
			}
		});
		
		// Render the chart
		if (container && chart) {
			try {
				const { svg } = await mermaid.render(id, chart);
				container.innerHTML = svg;
			} catch (error) {
				console.error('Mermaid rendering error:', error);
				const errorMessage = error instanceof Error ? error.message : 'Unknown error';
				container.innerHTML = `<div class="text-red-500 p-4 border border-red-300 rounded">Error rendering diagram: ${errorMessage}</div>`;
			}
		}
	});
</script>

<div bind:this={container} class="mermaid-container my-4"></div>

<style>
	.mermaid-container {
		text-align: center;
	}
	
	:global(.mermaid-container svg) {
		max-width: 100%;
		height: auto;
	}
</style> 