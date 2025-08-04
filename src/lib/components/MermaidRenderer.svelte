<script lang="ts">
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';
	
	export let htmlContent: string;
	
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
		
		// Set the HTML content first
		if (container) {
			container.innerHTML = htmlContent;
		}
		
		// Then find all mermaid diagram containers
		const mermaidContainers = document.querySelectorAll('.mermaid-diagram');
		
		for (const mermaidContainer of mermaidContainers) {
			const id = mermaidContainer.getAttribute('data-mermaid-id');
			const chart = mermaidContainer.getAttribute('data-mermaid-chart');
			
			if (id && chart) {
				try {
					const decodedChart = decodeURIComponent(chart);
					const { svg } = await mermaid.render(id, decodedChart);
					mermaidContainer.innerHTML = svg;
				} catch (error) {
					console.error('Mermaid rendering error:', error);
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					mermaidContainer.innerHTML = `<div class="text-red-500 p-4 border border-red-300 rounded">Error rendering diagram: ${errorMessage}</div>`;
				}
			}
		}
	});
</script>

<div bind:this={container}></div> 