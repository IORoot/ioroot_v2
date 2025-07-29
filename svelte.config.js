import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore errors for dynamic routes that can't be prerendered
				if (path.startsWith('/projects/')) {
					return;
				}
				throw new Error(message);
			}
		}
	},
	preprocess: [
		vitePreprocess()
	],
	extensions: ['.svelte']
};

export default config; 