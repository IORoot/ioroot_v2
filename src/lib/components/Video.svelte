<script lang="ts">
	export let videoId: string;
	export let title: string = '';
	export let width: string = '100%';
	export let height: string = '400px';
</script>

<div class="video-container my-8">
	<div class="relative w-full" style="max-width: {width}; height: {height};">
		<iframe
			src="https://www.youtube.com/embed/{videoId}"
			title={title || 'YouTube video'}
			class="w-full h-full rounded-lg shadow-lg"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
</div>

<style>
	.video-container {
		position: relative;
		width: 100%;
	}
	
	/* Responsive aspect ratio for YouTube videos */
	.video-container iframe {
		aspect-ratio: 16 / 9;
	}
</style> 