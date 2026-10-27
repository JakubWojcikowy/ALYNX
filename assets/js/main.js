/**
 * ALYNX Engineering Sp. z o.o. — Main JavaScript
 * High performance, zero external dependencies (Vanilla ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Dynamic Class ---
  const header = document.querySelector('.main-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Menu Navigation Toggle ---
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navbarMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>`;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. Navigation Links & Active State ---
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHash = link.getAttribute('href');
      
      // If link is an anchor on this page, smooth scroll
      if (targetHash && targetHash.startsWith('#')) {
        const targetSection = document.querySelector(targetHash);
        if (targetSection) {
          e.preventDefault();
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
          }

          const headerOffset = 90;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- 4. Portfolio Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Quick Quote / Contact Form Submission (Smart Mailto Generator) ---
  const quoteForm = document.getElementById('quickQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quoteName')?.value || '';
      const email = document.getElementById('quoteEmail')?.value || '';
      const phone = document.getElementById('quotePhone')?.value || '';
      const service = document.getElementById('quoteService')?.value || '';
      const dimensions = document.getElementById('quoteDimensions')?.value || '';
      const message = document.getElementById('quoteMessage')?.value || '';

      const recipient = 'biuro@alynx.com.pl';
      const subject = encodeURIComponent(`[Zapytanie Ofertowe ALYNX] - ${service || 'Spawanie konstrukcji'} - ${name}`);
      
      const bodyText = `Dzień dobry,

Zgłaszam zapytanie ofertowe za pośrednictwem strony internetowej ALYNX Engineering:

- Imię i nazwisko / Firma: ${name}
- E-mail: ${email}
- Telefon: ${phone}
- Rodzaj usługi: ${service}
- Szacowane wymiary / gabaryty: ${dimensions || 'Brak specyfikacji'}
- Opis zlecenia / materiały:
${message}

(Załączniki: dokumentację techniczną DXF/STEP/PDF dołączam do niniejszego maila)

Pozdrawiam,
${name}`;

      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
      
      // Feedback button state
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Przekierowywanie do poczty...</span>`;
      submitBtn.style.opacity = '0.8';

      setTimeout(() => {
        window.location.href = mailtoUrl;
        submitBtn.innerHTML = `✓ Przygotowano zapytanie`;
        submitBtn.style.background = '#10B981';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.opacity = '1';
        }, 4000);
      }, 400);
    });
  }

  // --- 6. Set Current Year in Footer ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
