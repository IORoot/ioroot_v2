export function initializeCarousels() {
	// Only run in browser environment
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return;
	}
	
	const carousels = document.querySelectorAll('.carousel');
	const logoStrips = document.querySelectorAll('.logo-strip');
	
	// Handle regular carousels
	carousels.forEach(carousel => {
		const container = carousel.querySelector('.carousel-container') as HTMLElement;
		const slides = container?.children;
		const prevBtn = carousel.querySelector('.carousel-prev') as HTMLButtonElement;
		const nextBtn = carousel.querySelector('.carousel-next') as HTMLButtonElement;
		const dots = carousel.querySelectorAll('.carousel-dot') as NodeListOf<HTMLButtonElement>;
		const counter = carousel.querySelector('.carousel-counter') as HTMLElement;
		const autoplay = (carousel as HTMLElement).dataset.autoplay === 'true';
		const interval = parseInt((carousel as HTMLElement).dataset.interval || '3000');
		
		if (!slides || slides.length <= 1) return;
		
		let currentIndex = 0;
		let intervalId: number | undefined;
		
		function updateSlide() {
			if (container) {
				container.style.transform = `translateX(-${currentIndex * 100}%)`;
			}
			
			// Update dots
			dots.forEach((dot, index: number) => {
				dot.classList.toggle('bg-gray-800', index === currentIndex);
				dot.classList.toggle('bg-gray-300', index !== currentIndex);
			});
			
			// Update counter
			if (counter) {
				counter.textContent = String(currentIndex + 1);
			}
		}
		
		function nextSlide() {
			if (slides) {
				currentIndex = (currentIndex + 1) % slides.length;
				updateSlide();
			}
		}
		
		function prevSlide() {
			if (slides) {
				currentIndex = (currentIndex - 1 + slides.length) % slides.length;
				updateSlide();
			}
		}
		
		function goToSlide(index: number) {
			currentIndex = index;
			updateSlide();
		}
		
		// Event listeners
		if (prevBtn) {
			prevBtn.addEventListener('click', prevSlide);
		}
		
		if (nextBtn) {
			nextBtn.addEventListener('click', nextSlide);
		}
		
		dots.forEach((dot, index: number) => {
			dot.addEventListener('click', () => goToSlide(index));
		});
		
		// Autoplay
		if (autoplay) {
			intervalId = setInterval(nextSlide, interval);
			
			// Pause on hover
			carousel.addEventListener('mouseenter', () => {
				if (intervalId) clearInterval(intervalId);
			});
			
			carousel.addEventListener('mouseleave', () => {
				intervalId = setInterval(nextSlide, interval);
			});
		}
		
		// Initialize
		updateSlide();
	});
	
	// Handle logo strips
	logoStrips.forEach(strip => {
		const container = strip.querySelector('.logo-container') as HTMLElement;
		const autoplay = (strip as HTMLElement).dataset.autoplay === 'true';
		
		if (!container) return;
		
		// Start the continuous animation
		if (autoplay) {
			// Move to the right continuously
			container.style.transform = 'translateX(-50%)';
			container.style.transition = 'transform 20s linear infinite';
		}
	});
} 