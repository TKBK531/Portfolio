/* Enhanced Portfolio JavaScript */

/* ----- INITIALIZATION ----- */
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initializeThemeToggle();
  initializeNavigation();
  initializeContactForm();
  initializeAnimations();
});

/* ----- THEME TOGGLE FUNCTIONALITY ----- */
function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');

  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }

  const themeIcon = themeToggle.querySelector('i');

  function updateTheme() {
    if (document.documentElement.classList.contains('dark')) {
      themeIcon.className = 'fas fa-sun text-lg';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.className = 'fas fa-moon text-lg';
      localStorage.setItem('theme', 'light');
    }
  }

  // Set initial theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  updateTheme();

  // Add click event listener
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    updateTheme();
    // Update navbar background to match new theme
    headerShadow();
  });

  console.log('Theme toggle initialized successfully');
}

/* ----- NAVIGATION FUNCTIONALITY ----- */
function initializeNavigation() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenuIcon.className = 'fas fa-bars text-lg';
      } else {
        mobileMenuIcon.className = 'fas fa-times text-lg';
      }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.className = 'fas fa-bars text-lg';
      });
    });
  }
}

/* ----- CONTACT FORM FUNCTIONALITY ----- */
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Portfolio Contact';
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i>Opening Email...';
    submitBtn.disabled = true;

    // Create mailto URL with pre-filled data
    const emailBody = `Hello,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio website`;

    const mailtoURL = `mailto:tharindukasthurisinghe@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open default email client
    window.location.href = mailtoURL;

    // Show success message
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Email Client Opened!';
      submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      submitBtn.classList.remove('bg-gradient-to-r', 'from-primary-600', 'to-primary-700');

      showNotification('Your email client should open with the message pre-filled. Please send it from there.', 'success');

      // Reset form
      contactForm.reset();
    }, 500);

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      submitBtn.classList.add('bg-gradient-to-r', 'from-primary-600', 'to-primary-700');
    }, 3000);
  });
}

/* ----- ANIMATIONS INITIALIZATION ----- */
function initializeAnimations() {
  // Initialize typing effect
  if (typeof Typed !== 'undefined') {
    const typingEffect = new Typed(".typedText", {
      strings: [
        "Full Stack Developer",
        "Backend Developer",
        "Frontend Developer",
        "Mobile Developer",
        "University Student",
        "Problem Solver"
      ],
      loop: true,
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 2000,
      startDelay: 500,
      cursorChar: '|',
      contentType: 'html',
    });
  }

  // Initialize scroll reveal animations
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 1500,
      delay: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      reset: false,
      mobile: true,
      opacity: 0,
      scale: 0.9,
    });

    // Enhanced scroll reveals with staggered animations
    sr.reveal(".hero-content", { delay: 300, duration: 1000, origin: "left" });
    sr.reveal(".hero-image", { delay: 600, duration: 1000, origin: "right" });
    sr.reveal(".about-content", { delay: 200, interval: 200 });
    sr.reveal(".project-card", { delay: 100, interval: 200, duration: 800 });
    sr.reveal(".skill-item", { delay: 100, interval: 100, duration: 600 });
    sr.reveal(".contact-form", { delay: 300, origin: "left" });
    sr.reveal(".contact-info", { delay: 300, origin: "right" });
  }
}

/* ----- ENHANCED NAVIGATION SHADOW & SCROLL EFFECTS ----- */
let lastScrollTop = 0;
const navbar = document.getElementById("header");

window.addEventListener('scroll', function () {
  headerShadow();
  handleNavbarVisibility();
  updateActiveLink();
});

function headerShadow() {
  const navHeader = document.getElementById("header");
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const isDark = document.documentElement.classList.contains('dark');

  if (scrollTop > 50) {
    navHeader.style.boxShadow = isDark
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)";
    navHeader.style.backgroundColor = isDark
      ? "rgba(15, 23, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)";
    navHeader.classList.add("nav-blur");
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.backgroundColor = isDark
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(255, 255, 255, 0.8)";
    navHeader.classList.remove("nav-blur");
  }
}

function handleNavbarVisibility() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

/* ----- ACTIVE LINK MANAGEMENT ----- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link, .nav-link-mobile");

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  const windowHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    // More precise active link detection
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active", "bg-primary-50", "dark:bg-primary-950", "text-primary-700", "dark:text-primary-300");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active", "bg-primary-50", "dark:bg-primary-950", "text-primary-700", "dark:text-primary-300");
        }
      });
    }
  });
}

/* ----- ENHANCED SMOOTH SCROLLING ----- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

/* ----- CV LINK ----- */
const cvLink = "https://drive.google.com/uc?export=download&id=1PZgrPqGat8x00eXQRKRDrWm6iQpzzfvv";

/* ----- ENHANCED EMAIL FUNCTIONALITY ----- */
// Initialize EmailJS
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("service_wy881iu");
  }
})();

// Enhanced contact form handling
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const sendButton = document.querySelector('.send-btn');

  // Handle both old and new form structures
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmission);
  } else if (sendButton) {
    sendButton.addEventListener('click', handleLegacyFormSubmission);
  }
});

async function handleFormSubmission(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');

  await sendEmail({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject') || 'Portfolio Contact',
    message: formData.get('message')
  }, submitBtn, form);
}

function handleLegacyFormSubmission(event) {
  event.preventDefault();

  const name = document.querySelector('input[placeholder="Name"]')?.value;
  const email = document.querySelector('input[placeholder="Email"]')?.value;
  const message = document.querySelector('textarea[placeholder="Message"]')?.value;

  if (!name || !email || !message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }

  sendEmail({
    name,
    email,
    subject: 'Portfolio Contact',
    message
  }, event.target);
}

async function sendEmail(data, button, form = null) {
  if (typeof emailjs === 'undefined') {
    showNotification('Email service not available. Please contact me directly.', 'error');
    return;
  }

  const originalText = button.innerHTML;

  // Show loading state
  button.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i>Sending...';
  button.disabled = true;

  try {
    await emailjs.send("service_wy881iu", "template_zbjsuhg", {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    });

    // Success feedback
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
    button.classList.add('bg-green-600', 'hover:bg-green-700');

    // Reset form if available
    if (form) {
      form.reset();
    } else {
      // Clear legacy form fields
      document.querySelector('input[placeholder="Name"]').value = '';
      document.querySelector('input[placeholder="Email"]').value = '';
      document.querySelector('textarea[placeholder="Message"]').value = '';
    }

    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

  } catch (error) {
    console.error('Error sending email:', error);
    button.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Send Failed';
    button.classList.add('bg-red-600', 'hover:bg-red-700');

    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
  }

  // Reset button after 3 seconds
  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
    button.classList.remove('bg-green-600', 'hover:bg-green-700', 'bg-red-600', 'hover:bg-red-700');
  }, 3000);
}

/* ----- NOTIFICATION SYSTEM ----- */
function showNotification(message, type = 'info') {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(notif => notif.remove());

  const notification = document.createElement('div');
  notification.className = `notification fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${type === 'success' ? 'bg-green-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`;

  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
      <span class="flex-1">${message}</span>
      <button class="ml-4 text-white hover:text-gray-200 transition-colors" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.classList.remove('translate-x-full');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.add('translate-x-full');
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/* ----- PERFORMANCE OPTIMIZATIONS ----- */
// Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
  headerShadow();
  handleNavbarVisibility();
  updateActiveLink();
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });

/* ----- INTERSECTION OBSERVER FOR ANIMATIONS ----- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide-up');
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  elementsToAnimate.forEach(el => {
    animationObserver.observe(el);
  });
});

/* ----- ACCESSIBILITY ENHANCEMENTS ----- */
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    // Remove focus from current element
    document.activeElement.blur();
  }
});

// Focus management for mobile menu
const mobileMenuToggle = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (!isHidden) {
      // Focus first link when menu opens
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }
  });
}

/* ----- PRELOADER (Optional) ----- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

/* ----- UTILITY FUNCTIONS ----- */
// Smooth reveal animations for elements
function revealElement(element, delay = 0) {
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
}

// Copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(() => {
    showNotification('Failed to copy to clipboard.', 'error');
  });
}

console.log('Portfolio JavaScript loaded successfully! 🚀');
