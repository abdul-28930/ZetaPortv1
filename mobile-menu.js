document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('-translate-x-full');
      mobileMenu.classList.toggle('translate-x-0');
      
      const svg = mobileMenuButton.querySelector('svg');
      if (mobileMenu.classList.contains('translate-x-0')) {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      } else {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu && mobileMenuButton) {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        
        const svg = mobileMenuButton.querySelector('svg');
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  });

  // Particles effect
  const particlesContainer = document.getElementById('particles');
  
  if (particlesContainer) {
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const color = Math.random() > 0.5 ? '#00f0c0' : '#ff2a6d';
      const opacity = Math.random() * 0.5 + 0.1;
      const duration = Math.random() * 50 + 20;
      
      particle.style.position = 'absolute';
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = opacity;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      particle.style.animation = `float ${duration}s infinite linear`;
      
      particlesContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0); }
        25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
        50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
        75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
        100% { transform: translate(0, 0); }
      }
    `;
    document.head.appendChild(style);
  }

  // Typewriter effect
  const typewriterElements = document.querySelectorAll('.typewriter');
  typewriterElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });

  // ScrollReveal
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 1000,
      delay: 200,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
    
    sr.reveal('.reveal-fade', { delay: 100 });
    sr.reveal('.reveal-title', { delay: 200, distance: '40px' });
    sr.reveal('.reveal-text', { delay: 300 });
    sr.reveal('.reveal-left', { origin: 'left' });
    sr.reveal('.reveal-right', { origin: 'right' });
    sr.reveal('.reveal-item', { interval: 150 });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Contact form
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      const formData = new FormData(this);
      
      button.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-cyber-bg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';
      button.disabled = true;
      
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        button.innerHTML = '<span class="inline-flex items-center"><svg class="h-4 w-4 mr-2 text-cyber-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Message Sent!</span>';
        button.classList.add('bg-green-500');
        button.classList.remove('bg-cyber-accent', 'hover:bg-cyber-accent/90');
        
        setTimeout(() => {
          this.reset();
          button.innerHTML = originalText;
          button.classList.remove('bg-green-500');
          button.classList.add('bg-cyber-accent', 'hover:bg-cyber-accent/90');
          button.disabled = false;
        }, 3000);
      })
      .catch(() => {
        button.innerHTML = '<span>❌ Error - Try Again</span>';
        button.disabled = false;
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 3000);
      });
    });
  }

  // Reviews slider functionality
  const reviewsSlider = document.querySelector('.reviews-slider');
  const reviewsTrack = document.querySelector('.reviews-track');
  const reviewsPrev = document.querySelector('.reviews-prev');
  const reviewsNext = document.querySelector('.reviews-next');
  const reviewsDots = document.querySelector('.reviews-dots');

  if (reviewsSlider && reviewsTrack) {
    let currentSlide = 0;
    let isAutoPlaying = true;
    let autoPlayInterval;
    let startX = 0;
    let isDragging = false;

    // Get all review cards
    const reviewCards = document.querySelectorAll('.review-card');
    const totalSlides = reviewCards.length;

    // Calculate slides per view based on screen size
    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3; // lg: 3 cards
      if (window.innerWidth >= 768) return 2;  // md: 2 cards
      return 1; // mobile: 1 card
    }

    // Calculate total pages
    function getTotalPages() {
      return Math.ceil(totalSlides / getSlidesPerView());
    }

    // Create dots indicators
    function createDots() {
      reviewsDots.innerHTML = '';
      const totalPages = getTotalPages();
      
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-cyber-accent w-6' : 'bg-cyber-border hover:bg-cyber-accent/50'}`;
        dot.addEventListener('click', () => goToSlide(i));
        reviewsDots.appendChild(dot);
      }
    }

    // Update dots
    function updateDots() {
      const dots = reviewsDots.querySelectorAll('button');
      const currentPage = Math.floor(currentSlide / getSlidesPerView());
      
      dots.forEach((dot, index) => {
        if (index === currentPage) {
          dot.className = 'w-6 h-2 rounded-full bg-cyber-accent transition-all duration-300';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-cyber-border hover:bg-cyber-accent/50 transition-all duration-300';
        }
      });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
      const slidesPerView = getSlidesPerView();
      const maxSlide = totalSlides - slidesPerView;
      
      currentSlide = Math.max(0, Math.min(slideIndex * slidesPerView, maxSlide));
      
      const translateX = -(currentSlide * (100 / slidesPerView));
      reviewsTrack.style.transform = `translateX(${translateX}%)`;
      
      updateDots();
    }

    // Next slide
    function nextSlide() {
      const slidesPerView = getSlidesPerView();
      const maxSlide = totalSlides - slidesPerView;
      
      if (currentSlide >= maxSlide) {
        currentSlide = 0; // Loop back to start
      } else {
        currentSlide += slidesPerView;
      }
      
      const translateX = -(currentSlide * (100 / slidesPerView));
      reviewsTrack.style.transform = `translateX(${translateX}%)`;
      
      updateDots();
    }

    // Previous slide
    function prevSlide() {
      const slidesPerView = getSlidesPerView();
      const maxSlide = totalSlides - slidesPerView;
      
      if (currentSlide <= 0) {
        currentSlide = maxSlide; // Loop to end
      } else {
        currentSlide -= slidesPerView;
      }
      
      const translateX = -(currentSlide * (100 / slidesPerView));
      reviewsTrack.style.transform = `translateX(${translateX}%)`;
      
      updateDots();
    }

    // Auto-play functionality
    function startAutoPlay() {
      if (isAutoPlaying) {
        autoPlayInterval = setInterval(nextSlide, 8000); // Increased from 4000ms to 8000ms
      }
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Touch/swipe support
    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoPlay();
    }

    function handleTouchMove(e) {
      if (!isDragging) return;
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      if (isAutoPlaying) {
        setTimeout(startAutoPlay, 1000); // Resume auto-play after 1 second
      }
    }

    // Mouse drag support
    function handleMouseDown(e) {
      startX = e.clientX;
      isDragging = true;
      stopAutoPlay();
      reviewsTrack.style.cursor = 'grabbing';
    }

    function handleMouseMove(e) {
      if (!isDragging) return;
      e.preventDefault();
    }

    function handleMouseUp(e) {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) { // Minimum drag distance
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      reviewsTrack.style.cursor = 'grab';
      
      if (isAutoPlaying) {
        setTimeout(startAutoPlay, 1000); // Resume auto-play after 1 second
      }
    }

    // Event listeners
    reviewsNext.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      if (isAutoPlaying) {
        setTimeout(startAutoPlay, 2000);
      }
    });

    reviewsPrev.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      if (isAutoPlaying) {
        setTimeout(startAutoPlay, 2000);
      }
    });

    // Touch events
    reviewsTrack.addEventListener('touchstart', handleTouchStart, { passive: false });
    reviewsTrack.addEventListener('touchmove', handleTouchMove, { passive: false });
    reviewsTrack.addEventListener('touchend', handleTouchEnd);

    // Mouse events
    reviewsTrack.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Pause auto-play on hover
    reviewsSlider.addEventListener('mouseenter', stopAutoPlay);
    reviewsSlider.addEventListener('mouseleave', () => {
      if (isAutoPlaying) {
        startAutoPlay();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      createDots();
      goToSlide(0); // Reset to first slide on resize
    });

    // Initialize
    reviewsTrack.style.cursor = 'grab';
    createDots();
    startAutoPlay();
  }
}); 