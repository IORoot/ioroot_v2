<script>
	import { goto } from '$app/navigation';

	// Navigation menu items
	const menuItems = [
		{ label: 'Home', action: () => goto('/') },
		{ label: 'Websites', action: () => goto('/websites') },
		{ label: 'Projects', action: () => goto('/projects') },
		{ label: 'Articles', action: () => goto('/articles') },
		{ label: 'About', action: () => goto('/about') },
		null // Empty slot
	];

	// Inventory items with images
	const inventory = [
		{ id: 1, image: '/images/inventory/gun.png', name: 'Gun' },
		{ id: 2, image: '/images/inventory/shoe.png', name: 'Shoe' },
		{ id: 3, image: '/images/inventory/laptop.png', name: 'Laptop' },
		{ id: 4, image: '/images/inventory/book.png', name: 'Book' },
		{ id: 5, image: '/images/inventory/axe.png', name: 'Axe' },
		{ id: 6, image: '/images/inventory/keyboard.png', name: 'Keyboard' },
		{ id: 7, image: '/images/inventory/phone.png', name: 'Phone' },
		{ id: 8, image: '/images/inventory/flowers.png', name: 'Flowers' }
	];
</script>

<div class="scumm-menu">
	<div class="menu-container">
		<!-- Navigation Grid (Left Half) -->
		<div class="navigation-grid">
			{#each menuItems as item}
				{#if item}
					<button class="menu-item" on:click={item.action}>
						{item.label}
					</button>
				{:else}
					<div class="empty-slot"></div>
				{/if}
			{/each}
		</div>

		<!-- Inventory Grid (Right Half) -->
		<div class="inventory-grid">
			{#each inventory as item}
				<div class="inventory-slot">
					<img 
						src={item.image} 
						alt={item.name}
						title={item.name}
						class="inventory-image"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* SCUMM Menu Styles */
	.scumm-menu {
		background: linear-gradient(to bottom, #2c3e50, #34495e);
		border-top: 3px solid #95a5a6;
		padding: 30px;
		height: 400px;
	}

	.menu-container {
		display: flex;
		gap: 20px;
		height: 100%;
	}

	/* Navigation Grid (Left Half) */
	.navigation-grid {
		flex: 1.4;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 12px;
		height: 100%;
		align-items: stretch;
		justify-items: stretch;
	}

	/* Inventory Grid (Right Half) */
	.inventory-grid {
		flex: 0.6;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 8px;
		height: 100%;
		align-items: stretch;
		justify-items: stretch;
	}

	.menu-item {
		background: linear-gradient(to bottom, #3498db, #2980b9);
		color: white;
		border: 2px solid #2c3e50;
		border-radius: 8px;
		padding: 20px 12px;
		font-size: 18px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 100%;
		width: 100%;
	}

	.menu-item:hover {
		background: linear-gradient(to bottom, #5dade2, #3498db);
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	}

	.menu-item:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.inventory-slot {
		background: white;
		border: 2px solid #2c3e50;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		height: 100%;
		width: 100%;
		padding: 4px;
	}

	.inventory-slot:hover {
		background: #f8f9fa;
		border-color: #3498db;
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.inventory-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 4px;
	}

	.empty-slot {
		background: rgba(52, 73, 94, 0.3);
		border: 2px dashed #7f8c8d;
		border-radius: 8px;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.scumm-menu {
			height: 300px;
			padding: 20px;
		}

		.menu-container {
			flex-direction: column;
			gap: 15px;
		}

		.navigation-grid,
		.inventory-grid {
			height: 100%;
		}

		.menu-item {
			font-size: 14px;
			padding: 15px 8px;
			height: 100%;
		}

		.inventory-slot {
			font-size: 12px;
			height: 100%;
		}
	}
</style> 