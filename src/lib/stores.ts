import { writable } from 'svelte/store';
import type { GameState, Scene, Sprite } from './types';

// Game state store
export const gameState = writable<GameState>({
	currentScene: 'home',
	inventory: [],
	characterPosition: { x: 100, y: 200 }
});

// Available scenes
export const scenes = writable<Record<string, Scene>>({
	home: {
		id: 'home',
		name: 'Home Office',
		background: '/images/backgrounds/home-bg.png',
		objects: [],
		characterStartPosition: { x: 100, y: 200 }
	},
	projects: {
		id: 'projects',
		name: 'Projects Room',
		background: '/images/backgrounds/projects-bg.png',
		objects: [],
		characterStartPosition: { x: 150, y: 250 }
	},
	websites: {
		id: 'websites',
		name: 'Websites Gallery',
		background: '/images/backgrounds/websites-bg.png',
		objects: [],
		characterStartPosition: { x: 200, y: 180 }
	},
	articles: {
		id: 'articles',
		name: 'Articles Library',
		background: '/images/backgrounds/articles-bg.jpg',
		objects: [],
		characterStartPosition: { x: 120, y: 220 }
	},
	about: {
		id: 'about',
		name: 'About Me',
		background: '/images/backgrounds/about-bg.jpg',
		objects: [],
		characterStartPosition: { x: 180, y: 200 }
	}
});

// Available sprites
export const sprites = writable<Record<string, Sprite>>({
	character: {
		id: 'character',
		url: '/images/sprites/character.png',
		width: 64,
		height: 64,
		animationFrames: 4
	},
	computer: {
		id: 'computer',
		url: '/images/sprites/computer.png',
		width: 80,
		height: 60
	},
	bookshelf: {
		id: 'bookshelf',
		url: '/images/sprites/bookshelf.png',
		width: 120,
		height: 200
	},
	window: {
		id: 'window',
		url: '/images/sprites/window.png',
		width: 100,
		height: 80
	}
});

// Game settings
export const gameSettings = writable({
	musicVolume: 0.5,
	sfxVolume: 0.7,
	animationSpeed: 1.0,
	showHints: true
}); 