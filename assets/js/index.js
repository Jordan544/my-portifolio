document.addEventListener('DOMContentLoaded', () => {
  // 0. Theme Toggle Handler
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  // Check saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    if (themeIcon) {
      themeIcon.className = 'bi bi-sun-fill';
    }
  } else {
    htmlElement.removeAttribute('data-theme');
    if (themeIcon) {
      themeIcon.className = 'bi bi-moon-fill';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.className = 'bi bi-moon-fill';
      } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.className = 'bi bi-sun-fill';
      }
    });
  }

  // 1. Content Reveal on Load / Scroll Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-element');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 2. Dynamic Scroll Spy Active Link Updater
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navmenu a');

  function updateActiveOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveOnScroll);
  updateActiveOnScroll(); // Run immediately on page load

  // 3. Skills Progress Bar & Number Counter Animation
  const skillsSection = document.querySelector('#skills');
  const progressBars = document.querySelectorAll('.progress-bar');
  const percentageSpans = document.querySelectorAll('.skill-percentage');
  let skillsAnimated = false;

  function runSkillsAnimation() {
    if (skillsAnimated) return;

    // Animate Progress Bar widths
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    });

    // Animate Number Counting from 0% to Target
    percentageSpans.forEach(span => {
      const target = +span.getAttribute('data-target');
      let current = 0;
      const increment = target / 40; // controls speed
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          span.textContent = target + '%';
          clearInterval(timer);
        } else {
          span.textContent = Math.floor(current) + '%';
        }
      }, 25);
    });

    skillsAnimated = true;
  }

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runSkillsAnimation();
      }
    });
  }, { threshold: 0.3 });

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});