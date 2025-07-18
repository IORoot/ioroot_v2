<script lang="ts">
	import type { InteractiveObject } from '../types';
	import { getPixelPosition } from '../collisionDetection';

	export let interactiveObjects: InteractiveObject[] = [];
	export let containerWidth: number = 0;
	export let containerHeight: number = 0;
	export let showDebug: boolean = false;
</script>

{#if showDebug}
	{#each interactiveObjects as object}
		{@const pos = getPixelPosition(object.x, object.y, object.width, object.height, containerWidth, containerHeight)}
		<div 
			class="interactive-debug"
			style="left: {pos.x}px; top: {pos.y}px; width: {pos.width}px; height: {pos.height}px;"
			title="{object.label}"
		>
			<div class="interactive-label">
				{object.label}
			</div>
		</div>
	{/each}
{/if}

<style>
	.interactive-debug {
		position: absolute;
		border: 2px solid blue;
		background: rgba(0, 0, 255, 0.2);
		pointer-events: none;
		z-index: 25;
	}

	.interactive-label {
		position: absolute;
		top: -20px;
		left: 0;
		background: blue;
		color: white;
		font-size: 10px;
		padding: 2px 4px;
		border-radius: 2px;
		white-space: nowrap;
	}
</style> 