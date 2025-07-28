import { processMdxContent } from './mdx-processor.js';
import hljs from 'highlight.js';

export function markdownToHtml(markdown: string): string {
	// Process MDX components first
	let processedContent = processMdxContent(markdown);
	
	// Extract code blocks to preserve them
	const codeBlocks: string[] = [];
	let codeBlockIndex = 0;
	
	// Extract list blocks to preserve them
	const listBlocks: string[] = [];
	let listBlockIndex = 0;
	
	// Replace code blocks with placeholders
	let processedMarkdown = processedContent.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
		// Use highlight.js for syntax highlighting
		let highlightedCode = code;
		if (lang) {
			try {
				highlightedCode = hljs.highlight(code, { language: lang }).value;
			} catch (e) {
				// Fallback to auto-detection if language is not supported
				highlightedCode = hljs.highlightAuto(code).value;
			}
		} else {
			// Auto-detect language if none specified
			highlightedCode = hljs.highlightAuto(code).value;
		}
		
		codeBlocks[codeBlockIndex] = `<pre class="bg-[#282C34] p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm border border-[#3E4451]"><code class="hljs">${highlightedCode}</code></pre>`;
		codeBlockIndex++;
		return `__CODE_BLOCK_${codeBlockIndex - 1}__`;
	});
	
	// Replace inline code
	const inlineCodeBlocks: string[] = [];
	processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, (match, code) => {
		inlineCodeBlocks.push(match);
		return `__INLINE_CODE_${inlineCodeBlocks.length - 1}__`;
	});
	
		// Convert markdown to HTML - process lists FIRST before paragraphs
	let html = processedMarkdown
		// Headers
		.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 mt-8">$1</h3>')
		.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-green-800 dark:text-green-200 mb-8 mt-12">$1</h2>')
		.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-green-800 dark:text-green-200 mb-10 mt-16">$1</h1>')
		
		// Horizontal rule
		.replace(/^---$/gm, '<hr class="my-8 border-gray-300">')
		
		// Bold, italic, and underline
		.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
		.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
		.replace(/__(.*?)__/g, '<u class="underline">$1</u>')
		
		// Images (must come BEFORE links to avoid conflicts)
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
			return `<img src="${src}" alt="${alt}" class="w-full h-auto rounded-lg shadow-lg mb-6" />`;
		})
		
		// Links
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline" target="_blank" rel="noopener noreferrer">$1</a>');
	
	// Process lists BEFORE paragraphs to avoid conflicts
	// First, let's process the markdown to identify list items and their nesting levels
	const lines = html.split('\n');
	const processedLines: string[] = [];
	let currentListLevel = 0;
	let inList = false;
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
		// Check for unordered list items
		const unorderedMatch = line.match(/^(\s*)(\*|\-)\s+(.+)$/);
		// Check for ordered list items
		const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
		
		if (unorderedMatch || orderedMatch) {
			const match = unorderedMatch || orderedMatch!;
			const indent = match[1];
			const marker = match[2];
			const content = match[3];
			
			// Calculate nesting level based on indentation
			const level = Math.floor(indent.length / 2); // Assuming 2 spaces per level
			
			// Create list item with appropriate nesting
			const listItem = `<li class="mb-3 text-lg">${content}</li>`;
			
			if (!inList) {
				// Start a new list
				processedLines.push('<ul class="list-disc list-inside mb-8 space-y-3 text-lg">');
				inList = true;
				currentListLevel = 0;
			}
			
			// Handle nesting
			if (level > currentListLevel) {
				// Start new nested list
				processedLines.push('<ul class="list-disc list-inside ml-6 space-y-2 text-lg">');
				currentListLevel = level;
			} else if (level < currentListLevel) {
				// Close nested lists
				for (let j = 0; j < currentListLevel - level; j++) {
					processedLines.push('</ul>');
				}
				currentListLevel = level;
			}
			
			processedLines.push(listItem);
		} else {
			// Non-list line
			if (inList) {
				// Close all open lists
				for (let j = 0; j <= currentListLevel; j++) {
					processedLines.push('</ul>');
				}
				inList = false;
				currentListLevel = 0;
			}
			processedLines.push(line);
		}
	}
	
	// Close any remaining open lists
	if (inList) {
		for (let j = 0; j <= currentListLevel; j++) {
			processedLines.push('</ul>');
		}
	}
	
	html = processedLines.join('\n');
	
	// Now process paragraphs (but exclude list items and existing HTML)
	html = html
		// Paragraphs (but not list items or existing HTML tags)
		.replace(/^(?!<[a-z]|__LIST_ITEM_|<\/).*$/gim, '<p class="mb-8 text-xl leading-relaxed">$&</p>')
		
		// Clean up empty paragraphs
		.replace(/<p class="mb-8 text-xl leading-relaxed"><\/p>/g, '')
		.replace(/<p class="mb-8 text-xl leading-relaxed"><\/p>/g, '')
		
		// Clean up multiple consecutive p tags
		.replace(/<\/p>\s*<p class="mb-8 text-xl leading-relaxed">/g, '<br>')
		
		// Clean up p tags around headers
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<h[1-6].*<\/h[1-6]>)<\/p>/g, '$1')
		
		// Clean up p tags around lists
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<ul.*<\/ul>)<\/p>/g, '$1')
		
		// Clean up p tags around code blocks
		.replace(/<p class="mb-8 text-xl leading-relaxed">(__CODE_BLOCK_\d+__)<\/p>/g, '$1')
		
		// Clean up p tags around inline code
		.replace(/<p class="mb-8 text-xl leading-relaxed">(__INLINE_CODE_\d+__)<\/p>/g, '$1')
		
		// Clean up p tags around images
		.replace(/<p class="mb-8 text-xl leading-relaxed">(<img.*?\/>)<\/p>/g, '$1')
		
		// Clean up any <br> tags that were added to HTML content
		.replace(/<br>\s*<br>/g, '')
		.replace(/<br>/g, '');
	
	// Restore code blocks
	codeBlocks.forEach((block, index) => {
		html = html.replace(`__CODE_BLOCK_${index}__`, block);
	});
	
	// Restore inline code
	inlineCodeBlocks.forEach((block, index) => {
		html = html.replace(`__INLINE_CODE_${index}__`, `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">${block.replace(/`/g, '')}</code>`);
	});
	
	// Keep local image paths for now
	// html = html.replace(/src="([^"]+\.(png|jpg|jpeg|gif|svg))"/g, (match, imagePath) => {
	// 	// If it's already a full URL, keep it
	// 	if (imagePath.startsWith('http')) {
	// 		return match;
	// 	}
	// 	// Convert local paths to GitHub raw URLs
	// 	const githubRawUrl = `https://raw.githubusercontent.com/IORoot/ioroot_v2/refs/heads/master/${imagePath}`;
	// 	return `src="${githubRawUrl}"`;
	// });
	
	return html;
} 