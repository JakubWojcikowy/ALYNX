/**
 * ALYNX Engineering — Główny skrypt JavaScript
 * Prosty, lekki, bez zewnętrznych bibliotek (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obsługa menu mobilnego
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    const iconHamburger = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
      </svg>`;
    const iconClose = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>`;

    function closeMobileMenu() {
      navMenu.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.setAttribute('aria-label', 'Otwórz menu');
      mobileBtn.innerHTML = iconHamburger;
    }

    function toggleMobileMenu(e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileBtn.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
      mobileBtn.innerHTML = isOpen ? iconClose : iconHamburger;
    }

    mobileBtn.addEventListener('click', toggleMobileMenu);

    // Zamknięcie menu po kliknięciu w dowolny link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Zamknięcie po kliknięciu poza menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Zamknięcie klawiszem Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // 2. Płynne przewijanie do sekcji po kliknięciu w zakładki
  const menuLinks = document.querySelectorAll('.nav-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          menuLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          const headerHeight = 80;
          const elementPos = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: elementPos - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Prosta obsługa formularza kontaktowego (tworzy maila do biuro@alynx.com.pl)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cName')?.value || '';
      const phone = document.getElementById('cPhone')?.value || '';
      const email = document.getElementById('cEmail')?.value || '';
      const service = document.getElementById('cService')?.value || 'Zapytanie ogólne';
      const message = document.getElementById('cMessage')?.value || '';

      const subject = encodeURIComponent(`[Zapytanie ze strony ALYNX] - ${service} - ${name}`);
      const body = encodeURIComponent(`Dzień dobry,

Wysyłam zapytanie za pośrednictwem strony internetowej ALYNX Engineering:

- Imię i nazwisko / Firma: ${name}
- Telefon: ${phone}
- E-mail: ${email}
- Temat: ${service}

Wiadomość / opis zlecenia:
${message}

Pozdrawiam,
${name}`);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Otwieranie poczty... ✓';
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3500);
      }

      window.location.href = `mailto:biuro@alynx.com.pl?subject=${subject}&body=${body}`;
    });
  }

  // 4. Aktualny rok w stopce
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
