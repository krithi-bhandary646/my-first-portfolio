/**
 * KRITHI — PORTFOLIO JAVASCRIPT
 * Senior Frontend Architecture: Accessible, Modern, Vanilla JavaScript (ES6+)
 * Zero external libraries or runtime dependencies required.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. PROJECT DATA STORE (Strictly aligned with resume)
  // =========================================================================
  const PROJECT_DATA = {
    'weather': {
      title: 'Weather Dashboard System',
      category: 'Web Application',
      categoryTag: 'web',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'Responsive UI'],
      description: 'A responsive web application that retrieves and renders real-time meteorological conditions inside a streamlined dashboard interface. Built to deliver quick insights into current weather data with an intuitive layout.',
      highlights: [
        'Real-time atmospheric data fetching via modern asynchronous JavaScript (Fetch API).',
        'Custom clean dashboard UI built with semantic HTML5 and responsive CSS Grid & Flexbox.',
        'Dynamic DOM updates rendering temperature, humidity, and forecast metrics with error handling.',
        'Optimized for both mobile and desktop screens.'
      ]
    },
    'attendance': {
      title: 'Student Attendance Management System',
      category: 'System / Management',
      categoryTag: 'java',
      tags: ['Java', 'OOP', 'Data Management', 'System Design'],
      description: 'A dedicated software application designed to record, organize, and track student attendance systematically, eliminating inefficiencies and reducing tedious manual paperwork for academic environments.',
      highlights: [
        'Engineered in Java utilizing Object-Oriented Programming (OOP) principles and modular architecture.',
        'Data tracking mechanisms for recording presence, absent logs, and section reports.',
        'Drastically reduces paperwork, manual counting errors, and data discrepancy in record management.',
        'Designed for straightforward navigation, structured data validation, and clean console/GUI flow.'
      ]
    },
    'arduino': {
      title: 'Arduino Human-Following Robot',
      category: 'Robotics & Hardware',
      categoryTag: 'robotics',
      tags: ['Arduino', 'Embedded C/C++', 'Sensors', 'Motor Drivers', 'Robotics'],
      description: 'An autonomous robotics engineering project featuring an Arduino microcontroller coupled with sensory navigation modules to actively detect, track, and follow human presence in real-time.',
      highlights: [
        'Integrated ultrasonic range finders and infrared sensors for distance measurement and target detection.',
        'Programmed micro-controller logic in Embedded C/C++ to interpret sensor thresholds and direct motor drivers.',
        'Implemented responsive obstacle avoidance algorithms while preserving human tracking trajectory.',
        'Combines electrical hardware integration with real-time algorithmic control loops.'
      ]
    },
    'snake-calc': {
      title: 'Snake Game & Calculator',
      category: 'Logic & Algorithms',
      categoryTag: 'java',
      tags: ['Java', 'Algorithms', 'Game Loops', 'Event Handling', 'OOP'],
      description: 'Core programming logic applications built in Java to master essential computer science fundamentals, algorithm mechanics, state management, and user interaction loops.',
      highlights: [
        'Snake Game: Implemented real-time game loop, 2D coordinate collision detection, food generation, and dynamic score tracking.',
        'Calculator: Engineered robust arithmetic parser with error handling for division by zero and input sanitization.',
        'Strengthened foundational object-oriented design patterns, conditional branching, and event processing.',
        'Demonstrates mastery of core Java syntax and algorithmic problem solving.'
      ]
    }
  };

  // =========================================================================
  // 2. THEME SWITCHER (Dark / Light Theme with localStorage persistence)
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('krithi-portfolio-theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.setAttribute('data-theme', 'dark');
  }
  updateMetaThemeColor();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('krithi-portfolio-theme', nextTheme);
      updateMetaThemeColor();
      showToast(`Switched to ${nextTheme} theme`, 'info');
    });
  }

  function updateMetaThemeColor() {
    if (!metaThemeColor) return;
    const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
    metaThemeColor.setAttribute('content', isDark ? '#0b0f19' : '#f8fafc');
  }

  // =========================================================================
  // 3. RESPONSIVE MOBILE NAVIGATION & ACCESSIBILITY
  // =========================================================================
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      toggleNav(!isExpanded);
    });

    // Close mobile nav when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('open')) {
          toggleNav(false);
        }
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (primaryNav.classList.contains('open') && 
          !primaryNav.contains(e.target) && 
          !navToggle.contains(e.target)) {
        toggleNav(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
        toggleNav(false);
        navToggle.focus();
      }
    });
  }

  function toggleNav(state) {
    navToggle.setAttribute('aria-expanded', String(state));
    if (state) {
      primaryNav.classList.add('open');
    } else {
      primaryNav.classList.remove('open');
    }
  }

  // =========================================================================
  // 4. HEADER SHADOW & SCROLLSPY (IntersectionObserver)
  // =========================================================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('main > section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ScrollSpy using IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // =========================================================================
  // 5. SCROLL REVEAL ANIMATIONS
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // =========================================================================
  // 6. PROJECTS CATEGORY FILTER
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state on buttons
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // 7. PROJECT DETAILS MODAL & FOCUS TRAPPING
  // =========================================================================
  const modal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const modalContactBtn = document.getElementById('modalContactBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalTags = document.getElementById('modalTags');
  const modalDescription = document.getElementById('modalDescription');
  const modalHighlights = document.getElementById('modalHighlights');

  let lastActiveElement = null;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      const project = PROJECT_DATA[projectKey];
      if (!project) return;

      lastActiveElement = btn;
      populateAndOpenModal(project);
    });
  });

  function populateAndOpenModal(data) {
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    
    // Render tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag';
      tagSpan.textContent = tag;
      modalTags.appendChild(tagSpan);
    });

    modalDescription.textContent = data.description;

    // Render highlights
    modalHighlights.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    // Open modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    closeModalBtn.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeModal);
  if (modalContactBtn) {
    modalContactBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Click on modal backdrop to close
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escape key closes modal & focus trap
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  // =========================================================================
  // 8. ONE-CLICK COPY TO CLIPBOARD
  // =========================================================================
  const copyButtons = document.querySelectorAll('.btn-copy[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback method for older browsers
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const copyTextSpan = btn.querySelector('.copy-text');
        const originalText = copyTextSpan ? copyTextSpan.textContent : 'Copy';
        btn.classList.add('copied');
        if (copyTextSpan) copyTextSpan.textContent = 'Copied!';

        showToast(`Copied "${textToCopy}" to clipboard`, 'success');

        setTimeout(() => {
          btn.classList.remove('copied');
          if (copyTextSpan) copyTextSpan.textContent = originalText;
        }, 2200);

      } catch (err) {
        showToast('Unable to copy automatically. Please select manually.', 'info');
      }
    });
  });

  // =========================================================================
  // 9. ACCESSIBLE CONTACT FORM VALIDATION & CLIENT-SIDE HANDLING
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const subjectSelect = document.getElementById('contactSubject');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const groupName = document.getElementById('group-name');
  const groupEmail = document.getElementById('group-email');
  const groupMessage = document.getElementById('group-message');

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim());
  }

  function validateNameField() {
    const val = nameInput.value.trim();
    if (!val) {
      showFieldError(groupName, nameInput, nameError, 'Please enter your name.');
      return false;
    } else if (val.length < 2) {
      showFieldError(groupName, nameInput, nameError, 'Name must be at least 2 characters.');
      return false;
    }
    clearFieldError(groupName, nameInput, nameError);
    return true;
  }

  function validateEmailField() {
    const val = emailInput.value.trim();
    if (!val) {
      showFieldError(groupEmail, emailInput, emailError, 'Please enter your email address.');
      return false;
    } else if (!validateEmail(val)) {
      showFieldError(groupEmail, emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
      return false;
    }
    clearFieldError(groupEmail, emailInput, emailError);
    return true;
  }

  function validateMessageField() {
    const val = messageInput.value.trim();
    if (!val) {
      showFieldError(groupMessage, messageInput, messageError, 'Please enter a message.');
      return false;
    } else if (val.length < 10) {
      showFieldError(groupMessage, messageInput, messageError, 'Message should be at least 10 characters.');
      return false;
    }
    clearFieldError(groupMessage, messageInput, messageError);
    return true;
  }

  function showFieldError(group, input, errorEl, message) {
    group.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function clearFieldError(group, input, errorEl) {
    group.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  // Real-time input listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (groupName.classList.contains('has-error')) validateNameField();
    });
    nameInput.addEventListener('blur', validateNameField);
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (groupEmail.classList.contains('has-error')) validateEmailField();
    });
    emailInput.addEventListener('blur', validateEmailField);
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (groupMessage.classList.contains('has-error')) validateMessageField();
    });
    messageInput.addEventListener('blur', validateMessageField);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateNameField();
      const isEmailValid = validateEmailField();
      const isMessageValid = validateMessageField();

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        showToast('Please fix the errors in the form before submitting.', 'info');
        return;
      }

      // Collect verified user submission
      const userName = nameInput.value.trim();
      const userEmail = emailInput.value.trim();
      const userSubject = subjectSelect.value;
      const userMessage = messageInput.value.trim();

      // Formulate mailto link as direct communication fallback
      const subjectText = encodeURIComponent(`Portfolio Inquiry [${userSubject}]: from ${userName}`);
      const bodyText = encodeURIComponent(`Hello Krithi,\n\nName: ${userName}\nEmail: ${userEmail}\nReason: ${userSubject}\n\nMessage:\n${userMessage}\n\nSent via Portfolio Contact Form.`);
      const mailtoUrl = `mailto:krithi.sbv9@gmail.com?subject=${subjectText}&body=${bodyText}`;

      // Show confirmation toast
      showToast(`Thank you, ${userName}! Your message is prepared. Opening your mail client...`, 'success');

      // Attempt to launch client or open fallback
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      // Reset form
      contactForm.reset();
      clearFieldError(groupName, nameInput, nameError);
      clearFieldError(groupEmail, emailInput, emailError);
      clearFieldError(groupMessage, messageInput, messageError);
    });
  }

  // =========================================================================
  // 10. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Auto dismiss after 3.8s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3800);
  }

  // =========================================================================
  // 11. FLOATING BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Set focus to skip link or home for keyboard users
      document.querySelector('.skip-link').focus();
    });
  }

  // =========================================================================
  // 12. DYNAMIC YEAR IN FOOTER
  // =========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 13. SMOOTH SCROLL WITH HEADER OFFSET COMPENSATION FOR ANCHOR LINKS
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main-content') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }

        // Accessibility: set focus to target element
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });

});
