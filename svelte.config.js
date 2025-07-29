import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: [] // Disable prerendering entirely
		}
	},
	preprocess: [
		vitePreprocess()
	],
	extensions: ['.svelte']
};

export default config; 