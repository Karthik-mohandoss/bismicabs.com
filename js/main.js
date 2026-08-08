document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu & Touch Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '☰';
      }
    });

    // Dropdown toggle on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dd => {
      dd.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.stopPropagation();
          dd.classList.toggle('open');
        }
      });
    });
  }

  // FAQ Accordion
  const faqQs = document.querySelectorAll('.faq-q');
  faqQs.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('open');
    });
  });

  // Scroll to Top
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Rich Animate on Scroll Observer
  const animElements = document.querySelectorAll('.animate-on-scroll, .animate-from-left, .animate-from-right, .animate-from-bottom, .animate-scale-in, .animate-pop');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => observer.observe(el));

  // Booking Form
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const from = document.getElementById('fromCity').value;
      const to = document.getElementById('toCity').value;
      const date = document.getElementById('travelDate').value;
      const message = `Hello Bismi Cabs, I want to book a taxi.%0AFrom: ${from}%0ATo: ${to}%0ADate: ${date}`;
      window.open(`https://wa.me/919500344749?text=${message}`, '_blank');
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value;
      const phone = document.getElementById('cPhone').value;
      const service = document.getElementById('cService').value;
      const msg = document.getElementById('cMessage').value;
      const message = `Hello Bismi Cabs, New Enquiry:%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${msg}`;
      window.open(`https://wa.me/919500344749?text=${message}`, '_blank');
    });
  }

  // Set minimum date
  const travelDateInputs = document.querySelectorAll('input[type="date"]');
  if (travelDateInputs.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    travelDateInputs.forEach(input => {
      input.setAttribute('min', today);
    });
  }

  // Smooth Running Counters (Integers and Decimals)
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const isDecimal = el.getAttribute('data-decimal') === 'true' || target % 1 !== 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out quad function for smooth deceleration
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = target * easeOut;

          if (isDecimal) {
            el.innerText = currentVal.toFixed(1);
          } else {
            el.innerText = Math.floor(currentVal).toLocaleString();
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerText = isDecimal ? target.toFixed(1) : target.toLocaleString();
          }
        };

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => counterObserver.observe(counter));
});
