import { processMdxContent } from './mdx-processor.js';
import hljs from 'highlight.js';

export function markdownToHtml(markdown: string): string {
	// Debug: Check if markdown contains emojis
	if (markdown.includes('🚀') || markdown.includes('🎨') || markdown.includes('⚡')) {
		console.log('🎯 Found emojis in markdown input');
	}
	
	// Process MDX components first
	let processedContent = processMdxContent(markdown);
	
	// Extract code blocks to preserve them
	const codeBlocks: string[] = [];
	let codeBlockIndex = 0;
	
	// Replace code blocks with placeholders
	let processedMarkdown = processedContent.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
		// Use highlight.js for syntax highlighting
		let highlightedCode = code;
		if (lang) {
			try {
				highlightedCode = hljs.highlight(code, { language: lang }).value;
			} catch (e) {
				highlightedCode = hljs.highlightAuto(code).value;
			}
		} else {
			highlightedCode = hljs.highlightAuto(code).value;
		}
		
		codeBlocks[codeBlockIndex] = `<pre class="bg-[#282C34] p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm border border-[#3E4451]"><code class="hljs">${highlightedCode}</code></pre>`;
		codeBlockIndex++;
		return `<!--CODE_BLOCK_${codeBlockIndex - 1}-->`;
	});
	
	// Replace inline code
	const inlineCodeBlocks: string[] = [];
	processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, (match, code) => {
		inlineCodeBlocks.push(match);
		return `<!--INLINE_CODE_${inlineCodeBlocks.length - 1}-->`;
	});
	
	// Extract HTML blocks to preserve them (including video components)
	const htmlBlocks: string[] = [];
	let htmlBlockIndex = 0;
	
	// Replace HTML blocks with placeholders (including div, iframe, etc.)
	processedMarkdown = processedMarkdown.replace(/(<div[\s\S]*?<\/div>|<iframe[\s\S]*?<\/iframe>|<video[\s\S]*?<\/video>)/g, (match, html) => {
		htmlBlocks[htmlBlockIndex] = html;
		htmlBlockIndex++;
		return `<!--HTML_BLOCK_${htmlBlockIndex - 1}-->`;
	});
	
	// Extract SVG blocks to preserve them
	const svgBlocks: string[] = [];
	let svgBlockIndex = 0;
	
	// Replace SVG blocks with placeholders
	processedMarkdown = processedMarkdown.replace(/(<svg[\s\S]*?<\/svg>)/g, (match, svg) => {
		// Convert JSX-style attributes to proper SVG attributes
		let processedSvg = svg
			.replace(/xlinkHref=\{([^}]+)\}/g, 'xlink:href="$1"')
			.replace(/xlinkHref="([^"]+)"/g, 'xlink:href="$1"')
			.replace(/xlinkHref='([^']+)'/g, "xlink:href='$1'")
			// Convert specific JSX variables to actual paths
			.replace(/\{bigben\}/g, '/images/articles/bigben.jpg');
		
		svgBlocks[svgBlockIndex] = processedSvg;
		svgBlockIndex++;
		return `<!--SVG_BLOCK_${svgBlockIndex - 1}-->`;
	});
	
	// Convert markdown to HTML using a simpler approach with emoji support
	let html = processedMarkdown
		// Headers
		.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 mt-8">$1</h3>')
		.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-green-800 dark:text-green-200 mb-8 mt-12">$1</h2>')
		.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-green-800 dark:text-green-200 mb-10 mt-16">$1</h1>')
		
		// Horizontal rule
		.replace(/^---$/gm, '<hr class="my-8 border-gray-300">')
		
			// Bold, italic, and underline (using Unicode-aware matching for emoji support)
	.replace(/\*\*([^*]+?)\*\*/gu, '<strong class="font-bold">$1</strong>')
	.replace(/\*([^*]+?)\*/gu, '<em class="italic">$1</em>')
	.replace(/__([^_]+?)__/gu, '<u class="underline">$1</u>')
		
		// Images (must come BEFORE links to avoid conflicts)
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
			return `<img src="${src}" alt="${alt}" class="w-full h-auto rounded-lg shadow-lg mb-6" />`;
		})
		
		// Links
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline" target="_blank" rel="noopener noreferrer">$1</a>')
		
		// Process lists properly
		.replace(/^\* (.*$)/gim, '<li class="mb-3 text-lg">$1</li>')
		.replace(/^- (.*$)/gim, '<li class="mb-3 text-lg">$1</li>')
		
		// Group consecutive list items into a single ul
		.replace(/(<li class="mb-3 text-lg">.*<\/li>)(\s*<li class="mb-3 text-lg">.*<\/li>)*/g, (match) => {
			return `<ul class="list-disc list-inside mb-8 space-y-3 text-lg">${match}</ul>`;
		})
		
		// Paragraphs (but exclude existing HTML tags and code blocks)
		.replace(/^(?!<[a-z]|<!--CODE_BLOCK_|<!--INLINE_CODE_|<!--SVG_BLOCK_|<!--HTML_BLOCK_).*$/gim, '<p class="mb-8 text-xl leading-relaxed">$&</p>')
		
		// Clean up empty paragraphs
		.replace(/<p class="mb-8 text-xl leading-relaxed"><\/p>/g, '')
		
		// Clean up p tags around headers
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<h[1-6].*<\/h[1-6]>)<\/p>/g, '$1')
		
		// Clean up p tags around lists
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<ul.*<\/ul>)<\/p>/g, '$1')
		
		// Clean up p tags around code blocks
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<!--CODE_BLOCK_\d+-->)\s*<\/p>/g, '$1')
		
		// Clean up p tags around inline code
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<!--INLINE_CODE_\d+-->)\s*<\/p>/g, '$1')
		
		// Clean up p tags around images
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<img.*?\/>)<\/p>/g, '$1')
		
		// Clean up p tags around SVG blocks
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<!--SVG_BLOCK_\d+-->)\s*<\/p>/g, '$1')
		
		// Clean up p tags around HTML blocks
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<!--HTML_BLOCK_\d+-->)\s*<\/p>/g, '$1')
		
		// Clean up p tags around any HTML tags
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<[^>]+>.*?<\/[^>]+>)<\/p>/g, '$1')
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<[^>]+\/>)<\/p>/g, '$1');
	
	// Restore code blocks
	codeBlocks.forEach((block, index) => {
		html = html.replace(`<!--CODE_BLOCK_${index}-->`, block);
	});
	
	// Restore inline code
	inlineCodeBlocks.forEach((block, index) => {
		html = html.replace(`<!--INLINE_CODE_${index}-->`, `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">${block.replace(/`/g, '')}</code>`);
	});
	
	// Restore SVG blocks
	svgBlocks.forEach((block, index) => {
		html = html.replace(`<!--SVG_BLOCK_${index}-->`, block);
	});
	
	// Restore HTML blocks
	htmlBlocks.forEach((block, index) => {
		html = html.replace(`<!--HTML_BLOCK_${index}-->`, block);
	});
	
	return html;
} 