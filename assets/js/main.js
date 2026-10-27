/**
 * ALYNX Engineering Sp. z o.o. — Główny skrypt JavaScript
 * Prosty, lekki, bez zewnętrznych bibliotek (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obsługa menu mobilnego
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Zamknięcie menu po kliknięciu w dowolny link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
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

      window.location.href = `mailto:biuro@alynx.com.pl?subject=${subject}&body=${body}`;
    });
  }

  // 4. Aktualny rok w stopce
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
