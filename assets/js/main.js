/**
 * Deoraj Contracting & General Maintenance LLC
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Navbar & Scroll Styling
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navbar Collapse on Click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // 3. Stats Counter Animation
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  function countUp() {
    counters.forEach(function (counter) {
      const target = +counter.getAttribute('data-count');
      const speed = 40; // lower is faster
      let count = 0;
      const increment = Math.ceil(target / speed);

      const updateCount = function () {
        count += increment;
        if (count < target) {
          counter.innerText = count + (counter.getAttribute('data-suffix') || '');
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target + (counter.getAttribute('data-suffix') || '');
        }
      };
      updateCount();
    });
  }

  // Trigger counter when in viewport
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !animated) {
          animated = true;
          countUp();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsSection);
  }

  // 4. Gallery / Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-filter-item');

  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectItems.forEach(function (item) {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            item.classList.add('animate__fadeIn');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Contact & Quote Forms Submission Handler
  const inquiryForms = document.querySelectorAll('.quote-form, #contactForm');
  inquiryForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Submitting...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show success alert
        alert('Thank you for contacting Deoraj Contracting & General Maintenance LLC! Your request has been received. Our team will contact you at +971-544542041 shortly.');
        form.reset();
      }, 1000);
    });
  });

  // 6. Year in Footer
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);
});
