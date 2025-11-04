// Splash screen fade out, then show main content
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const mainContent = document.getElementById('main-content');
  const footer = document.querySelector('.footer');
  
  // Only run splash screen logic if splash element exists (main page)
  if (splash && mainContent) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        mainContent.style.display = 'block';
        if (footer) footer.style.display = 'block';
        startTypewriter();
      }, 800);
    }, 1200);
  } else {
    // For pages without splash screen (like about-em.html)
    if (mainContent) mainContent.style.display = 'block';
    if (footer) footer.style.display = 'block';
  }
});

// Typewriter animation for hero
const words = ['idea', 'business', 'startup', 'brand.'];
const typewriterWord = document.getElementById('typewriter-word');
const typewriterCursor = document.getElementById('typewriter-cursor');
let wordIdx = 0;
let charIdx = 0;
let typing = true;

function typeWord(word, cb) {
  if (!typewriterWord || !typewriterCursor) return;
  
  charIdx = 0;
  typewriterWord.textContent = '';
  typewriterCursor.style.display = 'inline';
  typing = true;
  function typeChar() {
    if (charIdx < word.length) {
      typewriterWord.textContent += word[charIdx];
      charIdx++;
      setTimeout(typeChar, 80);
    } else {
      typing = false;
      setTimeout(cb, word === 'brand.' ? 600 : 700);
    }
  }
  typeChar();
}

function eraseWord(cb) {
  if (!typewriterWord) return;
  
  typing = true;
  function eraseChar() {
    if (typewriterWord.textContent.length > 0) {
      typewriterWord.textContent = typewriterWord.textContent.slice(0, -1);
      setTimeout(eraseChar, 40);
    } else {
      typing = false;
      setTimeout(cb, 200);
    }
  }
  eraseChar();
}

function startTypewriter() {
  // Only run typewriter if elements exist (main page)
  if (!typewriterWord || !typewriterCursor) return;
  
  wordIdx = 0;
  function nextWord() {
    typeWord(words[wordIdx], () => {
      if (words[wordIdx] === 'brand.') {
        // Show logo/tagline after final word
        setTimeout(() => {
          const heroLogoTagline = document.querySelector('.hero-logo-tagline');
          if (heroLogoTagline) heroLogoTagline.classList.add('visible');
        }, 600);
        if (typewriterCursor) typewriterCursor.style.display = 'none';
        return;
      }
      setTimeout(() => eraseWord(() => {
        wordIdx++;
        nextWord();
      }), 700);
    });
  }
  nextWord();
}

// Campaign card scroll animation
function revealOnScroll() {
  const cards = document.querySelectorAll('.campaign-card');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const teamSection = document.querySelector('.team-section');
  const trigger = window.innerHeight * 0.85;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < trigger) {
      card.classList.add('visible');
    }
  });
  
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger) {
      item.classList.add('visible');
    } else {
      item.classList.remove('visible');
    }
  });
  
  if (teamSection) {
    const rect = teamSection.getBoundingClientRect();
    if (rect.top < trigger) {
      teamSection.classList.add('visible');
    } else {
      teamSection.classList.remove('visible');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);



// Contact form animated labels (handled by CSS :focus + label)
// Optionally, add focus/blur for accessibility
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', () => input.classList.add('focused'));
  input.addEventListener('blur', () => input.classList.remove('focused'));
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const subject = 'New Contact Form Submission from EM Website';
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    const mailtoLink = `mailto:expressive.mkgt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
      alert('Thank you for your message! Your email client should open with a pre-filled message to EM.');
      contactForm.reset();
    }, 100);
  });
}

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (hamburgerMenu && navbarMenu) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburgerMenu.contains(event.target) && !navbarMenu.contains(event.target)) {
        hamburgerMenu.classList.remove('active');
        navbarMenu.classList.remove('active');
      }
    });
  }
});

// Campaign carousel scroll functionality
document.addEventListener('DOMContentLoaded', function() {
  const campaignCards = document.querySelector('.campaign-cards');
  const scrollLeftBtn = document.querySelector('.campaign-side-arrow-left');
  const scrollRightBtn = document.querySelector('.campaign-side-arrow-right');
  const fadeLeft = document.querySelector('.campaign-scroll-fade-left');
  const fadeRight = document.querySelector('.campaign-scroll-fade-right');
  
  if (campaignCards && scrollLeftBtn && scrollRightBtn) {
    const cardWidth = 350; // min-width of campaign card
    const gap = 40; // gap between cards (2.5rem = 40px)
    const scrollAmount = cardWidth + gap;
    
    function updateButtons() {
      const isAtStart = campaignCards.scrollLeft <= 10;
      const isAtEnd = campaignCards.scrollLeft >= campaignCards.scrollWidth - campaignCards.clientWidth - 10;
      
      scrollLeftBtn.disabled = isAtStart;
      scrollRightBtn.disabled = isAtEnd;
      
      // Update fade gradients
      if (fadeLeft && fadeRight) {
        if (isAtStart) {
          fadeLeft.classList.remove('visible');
        } else {
          fadeLeft.classList.add('visible');
        }
        
        if (isAtEnd) {
          fadeRight.classList.add('hidden');
        } else {
          fadeRight.classList.remove('hidden');
        }
      }
      
    }
    
    scrollLeftBtn.addEventListener('click', () => {
      campaignCards.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    scrollRightBtn.addEventListener('click', () => {
      campaignCards.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    campaignCards.addEventListener('scroll', updateButtons);
    updateButtons(); // Initial check
    
    // Also support touch/swipe on mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    campaignCards.addEventListener('mousedown', (e) => {
      isDown = true;
      campaignCards.style.cursor = 'grabbing';
      startX = e.pageX - campaignCards.offsetLeft;
      scrollLeft = campaignCards.scrollLeft;
    });
    
    campaignCards.addEventListener('mouseleave', () => {
      isDown = false;
      campaignCards.style.cursor = 'grab';
    });
    
    campaignCards.addEventListener('mouseup', () => {
      isDown = false;
      campaignCards.style.cursor = 'grab';
    });
    
    campaignCards.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - campaignCards.offsetLeft;
      const walk = (x - startX) * 2;
      campaignCards.scrollLeft = scrollLeft - walk;
    });
  }
});