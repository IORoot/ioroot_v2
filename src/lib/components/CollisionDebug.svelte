<script lang="ts">
	import type { CollisionArea } from '../types';
	import { getPixelPosition } from '../collisionDetection';

	export let collisionAreas: CollisionArea[] = [];
	export let containerWidth: number = 0;
	export let containerHeight: number = 0;
	export let showDebug: boolean = false;
</script>

{#if showDebug}
	{#each collisionAreas as area}
		{@const pos = getPixelPosition(area.x, area.y, area.width, area.height, containerWidth, containerHeight)}
		<div 
			class="collision-debug"
			style="left: {pos.x}px; top: {pos.y}px; width: {pos.width}px; height: {pos.height}px;"
			title="{area.label || area.id}"
		>
			<div class="collision-label">
				{area.type}
			</div>
		</div>
	{/each}
{/if}

<style>
	.collision-debug {
		position: absolute;
		border: 2px solid red;
		background: rgba(255, 0, 0, 0.2);
		pointer-events: none;
		z-index: 20;
	}

	.collision-label {
		position: absolute;
		top: -20px;
		left: 0;
		background: red;
		color: white;
		font-size: 10px;
		padding: 2px 4px;
		border-radius: 2px;
		white-space: nowrap;
	}
</style> 