import { writable } from 'svelte/store';
import type { Sprite } from './types';

// Sprite registry
const spriteRegistry = new Map<string, Sprite>();

// Available sprites store
export const availableSprites = writable<Map<string, Sprite>>(new Map());

// Register a new sprite
export function registerSprite(sprite: Sprite) {
	spriteRegistry.set(sprite.id, sprite);
	availableSprites.update(sprites => {
		sprites.set(sprite.id, sprite);
		return sprites;
	});
}

// Get a sprite by ID
export function getSprite(id: string): Sprite | undefined {
	return spriteRegistry.get(id);
}

// Load sprites from a configuration
export function loadSprites(spriteConfigs: Sprite[]) {
	spriteConfigs.forEach(sprite => registerSprite(sprite));
}

// Preload sprite images
export function preloadSprites(spriteIds: string[]) {
	spriteIds.forEach(id => {
		const sprite = getSprite(id);
		if (sprite) {
			const img = new Image();
			img.src = sprite.url;
		}
	});
}

// Default sprites
export const defaultSprites: Sprite[] = [
	{
		id: 'character',
		url: '/images/sprites/character.png',
		width: 960,
		height: 960,
		animationFrames: 4
	},
	{
		id: 'characterSprite',
		url: '/images/sprites/character-sprite.png',
		width: 7680, // 8 frames * 960px width
		height: 960,
		animationFrames: 8
	},
	{
		id: 'computer',
		url: '/images/sprites/computer.png',
		width: 80,
		height: 60
	},
	{
		id: 'bookshelf',
		url: '/images/sprites/bookshelf.png',
		width: 120,
		height: 200
	},
	{
		id: 'window',
		url: '/images/sprites/window.png',
		width: 100,
		height: 80
	},
	{
		id: 'project',
		url: '/images/sprites/project.png',
		width: 100,
		height: 80
	},
	{
		id: 'website',
		url: '/images/sprites/website.png',
		width: 120,
		height: 80
	},
	{
		id: 'article',
		url: '/images/sprites/article.png',
		width: 120,
		height: 80
	},
	{
		id: 'link',
		url: '/images/sprites/link.png',
		width: 120,
		height: 80
	}
];

// Initialize with default sprites
loadSprites(defaultSprites); 