/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,mdx,md}'],
	theme: {
		extend: {
			colors: {
				// Modernism/Grid Theme (Homepage)
				modern: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a'
				},
				// Professional Theme (About Me)
				professional: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e'
				},
				// Coding/AI Theme (Projects)
				tech: {
					50: '#fdf4ff',
					100: '#fae8ff',
					200: '#f5d0fe',
					300: '#f0abfc',
					400: '#e879f9',
					500: '#d946ef',
					600: '#c026d3',
					700: '#a21caf',
					800: '#86198f',
					900: '#701a75'
				},
				// 8-Bit Game Theme (Websites)
				game: {
					50: '#fefce8',
					100: '#fef9c3',
					200: '#fef08a',
					300: '#fde047',
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04',
					700: '#a16207',
					800: '#854d0e',
					900: '#713f12'
				},
				// 80s Retro Theme (Articles)
				retro: {
					50: '#fdf2f8',
					100: '#fce7f3',
					200: '#fbcfe8',
					300: '#f9a8d4',
					400: '#f472b6',
					500: '#ec4899',
					600: '#db2777',
					700: '#be185d',
					800: '#9d174d',
					900: '#831843'
				}
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
				'display': ['Inter', 'system-ui', 'sans-serif']
			},
			fontSize: {
				// Responsive font sizes based on viewport height
				'xs-vh': ['clamp(0.75rem, 2vh, 0.875rem)', { lineHeight: '1.5' }],
				'sm-vh': ['clamp(0.875rem, 2.5vh, 1rem)', { lineHeight: '1.5' }],
				'base-vh': ['clamp(1rem, 3vh, 1.125rem)', { lineHeight: '1.6' }],
				'lg-vh': ['clamp(1.125rem, 3.5vh, 1.25rem)', { lineHeight: '1.6' }],
				'xl-vh': ['clamp(1.25rem, 4vh, 1.5rem)', { lineHeight: '1.5' }],
				'2xl-vh': ['clamp(1.5rem, 5vh, 1.875rem)', { lineHeight: '1.4' }],
				'3xl-vh': ['clamp(1.875rem, 6vh, 2.25rem)', { lineHeight: '1.3' }],
				'4xl-vh': ['clamp(2.25rem, 7vh, 3rem)', { lineHeight: '1.2' }],
				'5xl-vh': ['clamp(3rem, 8vh, 4rem)', { lineHeight: '1.1' }],
				'6xl-vh': ['clamp(4rem, 10vh, 5rem)', { lineHeight: '1' }],
				'7xl-vh': ['clamp(5rem, 12vh, 6rem)', { lineHeight: '1' }],
				'8xl-vh': ['clamp(6rem, 15vh, 8rem)', { lineHeight: '1' }],
				'9xl-vh': ['clamp(8rem, 20vh, 12rem)', { lineHeight: '1' }]
			}
		}
	},
	plugins: []
}; 