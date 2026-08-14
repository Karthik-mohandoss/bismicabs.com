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
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking any direct nav link
    navLinks.querySelectorAll('a:not(.dropdown > a)').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Dropdown toggle on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dd => {
      dd.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
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
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', { 'send_to': 'AW-17946980744/cExgCKO18N8cEIjj5O1C', 'value': 1.0, 'currency': 'INR' });
      }
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
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', { 'send_to': 'AW-17946980744/cExgCKO18N8cEIjj5O1C', 'value': 1.0, 'currency': 'INR' });
      }
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

  // Fleet Swipeable Carousel Controller
  const fleetTrack = document.getElementById('fleetTrack');
  const fleetPrevBtn = document.getElementById('fleetPrevBtn');
  const fleetNextBtn = document.getElementById('fleetNextBtn');
  const fleetDots = document.querySelectorAll('#fleetDots .carousel-dot');

  if (fleetTrack) {
    const getCardWidth = () => {
      const card = fleetTrack.querySelector('.fleet-card');
      return card ? card.offsetWidth + 24 : 320;
    };

    if (fleetPrevBtn) {
      fleetPrevBtn.addEventListener('click', () => {
        fleetTrack.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
      });
    }

    if (fleetNextBtn) {
      fleetNextBtn.addEventListener('click', () => {
        fleetTrack.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
      });
    }

    fleetDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        const cardWidth = getCardWidth();
        fleetTrack.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      });
    });

    // Sync active dot indicator on scroll/swipe
    let scrollTimeout;
    fleetTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = fleetTrack.scrollLeft;
        const cardWidth = getCardWidth();
        const activeIndex = Math.min(Math.round(scrollLeft / cardWidth), fleetDots.length - 1);
        fleetDots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }, 50);
    }, { passive: true });
  }

  // Customer Reviews Swipeable Carousel Controller
  const reviewTrack = document.getElementById('reviewCarouselTrack');
  const reviewPrevBtn = document.getElementById('reviewPrevBtn');
  const reviewNextBtn = document.getElementById('reviewNextBtn');
  const reviewDots = document.querySelectorAll('#reviewDots .carousel-dot');

  if (reviewTrack) {
    const getReviewCardWidth = () => {
      const card = reviewTrack.querySelector('.review-card');
      return card ? card.offsetWidth + 24 : 340;
    };

    if (reviewPrevBtn) {
      reviewPrevBtn.addEventListener('click', () => {
        reviewTrack.scrollBy({ left: -getReviewCardWidth(), behavior: 'smooth' });
      });
    }

    if (reviewNextBtn) {
      reviewNextBtn.addEventListener('click', () => {
        reviewTrack.scrollBy({ left: getReviewCardWidth(), behavior: 'smooth' });
      });
    }

    reviewDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        const cardWidth = getReviewCardWidth();
        reviewTrack.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      });
    });

    // Sync active dot indicator on scroll/swipe
    let reviewScrollTimeout;
    reviewTrack.addEventListener('scroll', () => {
      clearTimeout(reviewScrollTimeout);
      reviewScrollTimeout = setTimeout(() => {
        const scrollLeft = reviewTrack.scrollLeft;
        const cardWidth = getReviewCardWidth();
        const activeIndex = Math.min(Math.round(scrollLeft / cardWidth), reviewDots.length - 1);
        reviewDots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }, 50);
    }, { passive: true });
  }

  // Google Ads Click to Call Conversion Tracking
  window.gtag_report_conversion = function(url) {
    var callback = function () {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
          'send_to': 'AW-17946980744/wk6PCMOC6d8cEIjj5O1C',
          'value': 1.0,
          'currency': 'INR',
          'event_callback': callback
      });
    } else {
      callback();
    }
    return false;
  };

  // Attach conversion tracking to all phone and WhatsApp links
  document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (typeof gtag === 'function' && link.target !== '_blank') {
        e.preventDefault();
        window.gtag_report_conversion(link.href);
      } else if (typeof gtag === 'function' && link.target === '_blank') {
        // For new tab links, just send the event and don't prevent default
        gtag('event', 'conversion', {
            'send_to': 'AW-17946980744/wk6PCMOC6d8cEIjj5O1C',
            'value': 1.0,
            'currency': 'INR'
        });
      }
    });
  });
});

