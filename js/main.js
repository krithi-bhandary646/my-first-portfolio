document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu after a nav link is chosen (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll-reveal for .reveal elements ----
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ---- Copy-to-clipboard buttons (if present) ----
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy-text');
      if (!text || !navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(function () {
        btn.setAttribute('data-copied', 'true');
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () {
          btn.textContent = original;
          btn.removeAttribute('data-copied');
        }, 2000);
      });
    });
  });

  // ---- Accessible contact form validation ----
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var fields = [
    { input: document.getElementById('name'), wrapper: document.getElementById('name-field'), error: document.getElementById('name-error'), validate: function (v) { return v.trim().length > 0; } },
    { input: document.getElementById('email'), wrapper: document.getElementById('email-field'), error: document.getElementById('email-error'), validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
    { input: document.getElementById('message'), wrapper: document.getElementById('message-field'), error: document.getElementById('message-error'), validate: function (v) { return v.trim().length > 0; } }
  ];

  function setFieldValidity(field, isValid) {
    field.input.setAttribute('aria-invalid', String(!isValid));
    field.wrapper.setAttribute('data-invalid', String(!isValid));
    field.error.hidden = isValid;
  }

  function showStatus(message) {
    status.textContent = message;
    status.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstInvalid = null;
    var allValid = true;

    fields.forEach(function (field) {
      var valid = field.validate(field.input.value);
      setFieldValidity(field, valid);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field.input;
      }
    });

    if (!allValid) {
      showStatus('There is a problem with the form. Please review the highlighted fields.');
      firstInvalid.focus();
      return;
    }

    // Simulated submit — connect this to a real endpoint or form service later.
    showStatus('Thanks! Your message has been sent.');
    form.reset();
    fields.forEach(function (field) { setFieldValidity(field, true); });
  });
});
