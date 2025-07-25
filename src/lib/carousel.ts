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
		const topContainer = strip.querySelector('.logo-container-top') as HTMLElement;
		const bottomContainer = strip.querySelector('.logo-container-bottom') as HTMLElement;
		const oldContainer = strip.querySelector('.logo-container') as HTMLElement;
		const autoplay = (strip as HTMLElement).dataset.autoplay === 'true';
		
		// Handle two-row format
		if (topContainer && bottomContainer) {
			// Start the continuous animation for both rows
			if (autoplay) {
				// Top row - faster speed
				let topPosition = 0;
				const animateTop = () => {
					topPosition -= 2; // Move 2px per frame (faster)
					topContainer.style.transform = `translateX(${topPosition}px)`;
					
					// Reset position when we've moved the full width
					if (Math.abs(topPosition) >= topContainer.scrollWidth / 2) {
						topPosition = 0;
					}
					
					requestAnimationFrame(animateTop);
				};
				
				// Bottom row - slower speed
				let bottomPosition = 0;
				const animateBottom = () => {
					bottomPosition -= 1; // Move 1px per frame (slower)
					bottomContainer.style.transform = `translateX(${bottomPosition}px)`;
					
					// Reset position when we've moved the full width
					if (Math.abs(bottomPosition) >= bottomContainer.scrollWidth / 2) {
						bottomPosition = 0;
					}
					
					requestAnimationFrame(animateBottom);
				};
				
				// Start both animations
				requestAnimationFrame(animateTop);
				requestAnimationFrame(animateBottom);
			}
		}
		// Handle single-row format (fallback)
		else if (oldContainer) {
			if (autoplay) {
				let position = 0;
				const animate = () => {
					position -= 1; // Move 1px per frame
					oldContainer.style.transform = `translateX(${position}px)`;
					
					// Reset position when we've moved the full width
					if (Math.abs(position) >= oldContainer.scrollWidth / 2) {
						position = 0;
					}
					
					requestAnimationFrame(animate);
				};
				
				// Start the animation
				requestAnimationFrame(animate);
			}
		}
	});
} 