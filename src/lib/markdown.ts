export function markdownToHtml(markdown: string): string {
	// Extract code blocks to preserve them
	const codeBlocks: string[] = [];
	let codeBlockIndex = 0;
	
	// Replace code blocks with placeholders
	let processedMarkdown = markdown.replace(/```[\s\S]*?```/g, (match) => {
		codeBlocks.push(match);
		return `__CODE_BLOCK_${codeBlockIndex++}__`;
	});
	
	// Replace inline code
	const inlineCodeBlocks: string[] = [];
	processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, (match, code) => {
		inlineCodeBlocks.push(match);
		return `__INLINE_CODE_${inlineCodeBlocks.length - 1}__`;
	});
	
	// Convert markdown to HTML
	let html = processedMarkdown
		// Headers
		.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 mt-8">$1</h3>')
		.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-green-800 dark:text-green-200 mb-8 mt-12">$1</h2>')
		.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-green-800 dark:text-green-200 mb-10 mt-16">$1</h1>')
		
		// Bold and italic
		.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
		.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
		
		// Links
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline" target="_blank" rel="noopener noreferrer">$1</a>')
		
		// Lists
		.replace(/^\* (.*$)/gim, '<li class="mb-3 text-lg">$1</li>')
		.replace(/^- (.*$)/gim, '<li class="mb-3 text-lg">$1</li>')
		
		// Wrap lists
		.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-8 space-y-3 text-lg">$1</ul>')
		
		// Paragraphs
		.replace(/^(?!<[a-z]).*$/gim, '<p class="mb-6 text-xl leading-relaxed">$&</p>')
		
		// Clean up empty paragraphs
		.replace(/<p class="mb-6 text-xl leading-relaxed"><\/p>/g, '')
		.replace(/<p class="mb-6 text-xl leading-relaxed"><\/p>/g, '')
		
		// Clean up multiple consecutive p tags
		.replace(/<\/p>\s*<p class="mb-6 text-xl leading-relaxed">/g, '<br>')
		
		// Clean up p tags around headers
		.replace(/<p class="mb-6 text-xl leading-relaxed">(<h[1-6].*<\/h[1-6]>)<\/p>/g, '$1')
		
		// Clean up p tags around lists
		.replace(/<p class="mb-6 text-xl leading-relaxed">(<ul.*<\/ul>)<\/p>/g, '$1')
		
		// Clean up p tags around code blocks
		.replace(/<p class="mb-6 text-xl leading-relaxed">(__CODE_BLOCK_\d+__)<\/p>/g, '$1')
		
		// Clean up p tags around inline code
		.replace(/<p class="mb-6 text-xl leading-relaxed">(__INLINE_CODE_\d+__)<\/p>/g, '$1');
	
	// Restore code blocks
	codeBlocks.forEach((block, index) => {
		html = html.replace(`__CODE_BLOCK_${index}__`, `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm">${block.replace(/```/g, '')}</code></pre>`);
	});
	
	// Restore inline code
	inlineCodeBlocks.forEach((block, index) => {
		html = html.replace(`__INLINE_CODE_${index}__`, `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">${block.replace(/`/g, '')}</code>`);
	});
	
	// Convert local image references to GitHub raw URLs
	html = html.replace(/src="([^"]+\.(png|jpg|jpeg|gif|svg))"/g, (match, imagePath) => {
		// If it's already a full URL, keep it
		if (imagePath.startsWith('http')) {
			return match;
		}
		// Convert local paths to GitHub raw URLs
		const githubRawUrl = `https://raw.githubusercontent.com/IORoot/ioroot_v2/refs/heads/master/${imagePath}`;
		return `src="${githubRawUrl}"`;
	});
	
	return html;
} 