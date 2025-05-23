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
      
      button.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-cyber-bg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>';
      
      setTimeout(() => {
        button.innerHTML = '<span class="inline-flex items-center"><svg class="h-4 w-4 mr-2 text-cyber-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Project Brief Sent!</span>';
        button.classList.add('bg-green-500');
        button.classList.remove('bg-cyber-accent', 'hover:bg-cyber-accent/90');
        
        setTimeout(() => {
          this.reset();
          button.innerHTML = originalText;
          button.classList.remove('bg-green-500');
          button.classList.add('bg-cyber-accent', 'hover:bg-cyber-accent/90');
        }, 2000);
      }, 1500);
    });
  }
}); 