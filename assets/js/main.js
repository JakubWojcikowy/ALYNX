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

    const isEn = document.documentElement.lang === 'en';

    function closeMobileMenu() {
      navMenu.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.setAttribute('aria-label', isEn ? 'Open menu' : 'Otwórz menu');
      mobileBtn.innerHTML = iconHamburger;
    }

    function toggleMobileMenu(e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileBtn.setAttribute('aria-label', isEn ? (isOpen ? 'Close menu' : 'Open menu') : (isOpen ? 'Zamknij menu' : 'Otwórz menu'));
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

  // 3. Zaawansowana obsługa formularza kontaktowego (walidacja + wysyłka bezpośrednia Web3Forms / Hostido PHP)
  // Aby maile przychodziły na biuro@alynx.com.pl z dowolnego miejsca bez własnego serwera:
  // wejdź na https://web3forms.com, wpisz biuro@alynx.com.pl i wklej otrzymany na maila klucz poniżej:
  const WEB3FORMS_ACCESS_KEY = ""; // np. "a1b2c3d4-e5f6-7890-abcd-ef1234567890"

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const isEn = document.documentElement.lang === 'en';
    const nameInput = document.getElementById('cName');
    const phoneInput = document.getElementById('cPhone');
    const emailInput = document.getElementById('cEmail');
    const serviceInput = document.getElementById('cService');
    const messageInput = document.getElementById('cMessage');
    const submitBtn = document.getElementById('cSubmitBtn') || contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');

    const nameError = document.getElementById('cNameError');
    const phoneError = document.getElementById('cPhoneError');
    const emailError = document.getElementById('cEmailError');
    const messageError = document.getElementById('cMessageError');

    // Usuwanie błędów na bieżąco podczas wpisywania
    const setupInputClearing = (input, errorEl) => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.style.display = 'none';
        }
      });
    };

    setupInputClearing(nameInput, nameError);
    setupInputClearing(phoneInput, phoneError);
    setupInputClearing(emailInput, emailError);
    setupInputClearing(messageInput, messageError);

    const showError = (input, errorEl, msg) => {
      if (input) input.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
      }
    };

    const clearAllErrors = () => {
      [nameInput, phoneInput, emailInput, messageInput].forEach(inp => inp && inp.classList.remove('is-invalid'));
      [nameError, phoneError, emailError, messageError].forEach(err => {
        if (err) {
          err.textContent = '';
          err.style.display = 'none';
        }
      });
    };

    const showStatus = (type, htmlContent) => {
      if (!formStatus) return;
      formStatus.className = `form-status-alert ${type}`;
      formStatus.innerHTML = htmlContent;
      formStatus.style.display = 'flex';
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAllErrors();
      if (formStatus) formStatus.style.display = 'none';

      const name = nameInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const service = serviceInput?.value || (isEn ? 'General Inquiry' : 'Zapytanie ogólne');
      const message = messageInput?.value.trim() || '';

      // Sprawdzenie honeypot
      const botcheck = contactForm.querySelector('input[name="botcheck"]');
      if (botcheck && botcheck.checked) return;

      // 1. Dokładna walidacja pól
      let isValid = true;
      let firstInvalid = null;

      if (name.length < 2) {
        showError(nameInput, nameError, isEn ? 'Please enter your full name or company name.' : 'Proszę podać imię i nazwisko lub nazwę firmy (min. 2 znaki).');
        isValid = false;
        if (!firstInvalid) firstInvalid = nameInput;
      }

      const phoneRegex = /^[+0-9\s\-()]{7,25}$/;
      if (!phone || !phoneRegex.test(phone)) {
        showError(phoneInput, phoneError, isEn ? 'Please enter a valid phone number (min. 7 digits).' : 'Proszę podać poprawny numer telefonu (min. 7 cyfr).');
        isValid = false;
        if (!firstInvalid) firstInvalid = phoneInput;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError(emailInput, emailError, isEn ? 'Please enter a valid email address.' : 'Proszę podać prawidłowy adres e-mail (np. kontakt@firma.pl).');
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      }

      if (message.length < 5) {
        showError(messageInput, messageError, isEn ? 'Please describe your project or inquiry scope.' : 'Proszę wpisać treść wiadomości / opis zlecenia.');
        isValid = false;
        if (!firstInvalid) firstInvalid = messageInput;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // 2. Przygotowanie do wysyłki
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.textContent = isEn ? 'Sending inquiry... ⏳' : 'Wysyłanie wiadomości... ⏳';
      }

      const accessKey = WEB3FORMS_ACCESS_KEY || document.getElementById('w3fKey')?.value || '';
      const phpEndpoint = isEn ? '../contact.php' : './contact.php';

      let sentSuccess = false;

      // Przygotowanie danych
      const subject = isEn 
        ? `[ALYNX Engineering Inquiry] - ${service} - ${name}`
        : `[Zapytanie ze strony ALYNX] - ${service} - ${name}`;

      try {
        // Jeśli podano klucz Web3Forms -> wysyłamy przez bezpieczne API Web3Forms
        if (accessKey && accessKey.length > 5) {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: accessKey,
              name: name,
              phone: phone,
              email: email,
              service: service,
              message: message,
              subject: subject,
              from_name: name,
              replyto: email,
              botcheck: ''
            })
          });

          const data = await res.json();
          if (res.ok && data.success) {
            sentSuccess = true;
          } else {
            throw new Error(data.message || 'Błąd wysyłki Web3Forms');
          }
        } else {
          // Jeśli brak klucza Web3Forms -> wysyłamy przez natywny skrypt PHP na serwerze (Hostido)
          const formData = new FormData();
          formData.append('name', name);
          formData.append('phone', phone);
          formData.append('email', email);
          formData.append('service', service);
          formData.append('message', message);
          formData.append('botcheck', '');

          const res = await fetch(phpEndpoint, {
            method: 'POST',
            body: formData
          });

          const data = await res.json();
          if (res.ok && data.success) {
            sentSuccess = true;
          } else {
            throw new Error(data.message || 'Błąd skryptu PHP');
          }
        }
      } catch (err) {
        console.warn('Wysyłka bezpośrednia nie powiodła się, wyświetlam informację lub fallback:', err);
        sentSuccess = false;
      }

      // 3. Obsługa sukcesu lub fallbacku
      if (sentSuccess) {
        if (submitBtn) {
          submitBtn.textContent = isEn ? 'Sent successfully ✓' : 'Wysłano pomyślnie ✓';
          submitBtn.classList.remove('is-loading');
        }

        const successHtml = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <strong>${isEn ? 'Inquiry sent successfully!' : 'Wiadomość została wysłana!'}</strong><br>
            ${isEn 
              ? 'Thank you for reaching out. Your inquiry has been sent directly to ALYNX Engineering. We will review your project and get back to you shortly.' 
              : 'Dziękujemy za kontakt. Twoja wiadomość trafiła bezpośrednio do naszego biura inżynieryjnego. Odpowiemy najszybciej jak to możliwe.'}
          </div>
        `;
        showStatus('success', successHtml);
        contactForm.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
          }
        }, 5000);

      } else {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
        }

        const mailtoUrl = `mailto:biuro@alynx.com.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          isEn 
            ? `Name / Company: ${name}\nPhone: ${phone}\nEmail: ${email}\nTopic: ${service}\n\nProject description:\n${message}` 
            : `Imię / Firma: ${name}\nTelefon: ${phone}\nE-mail: ${email}\nTemat: ${service}\n\nOpis zlecenia:\n${message}`
        )}`;

        const errorHtml = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div>
            <strong>${isEn ? 'Direct send pending server key' : 'Wymagana konfiguracja klucza lub serwera'}</strong><br>
            ${isEn 
              ? 'To enable 1-click cloud sending, enter your free Web3Forms access key or upload to Hostido server. In the meantime, you can send your inquiry directly via your email client:' 
              : 'Aby wysyłać maile prosto ze strony, wystarczy wkleić darmowy klucz Web3Forms w pliku assets/js/main.js lub wrzucić stronę na serwer Hostido. Możesz też przesłać zapytanie bezpośrednio przez swój program pocztowy:'}
            <div style="margin-top: 10px;">
              <a href="${mailtoUrl}" class="btn btn-outline" style="font-size: 0.85rem; padding: 8px 16px; display: inline-flex;">
                ${isEn ? 'Open in Email Client' : 'Wyślij przez program pocztowy'}
              </a>
            </div>
          </div>
        `;
        showStatus('error', errorHtml);
      }
    });
  }

  // 4. Aktualny rok w stopce
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Podgląd powiększonego zdjęcia (Lightbox Modal)
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
  if (lightboxTriggers.length > 0) {
    let lightboxModal = document.getElementById('imageLightbox');
    if (!lightboxModal) {
      lightboxModal = document.createElement('div');
      lightboxModal.id = 'imageLightbox';
      lightboxModal.className = 'lightbox-modal';
      lightboxModal.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
          <button type="button" class="lightbox-close" aria-label="Zamknij podgląd">&times;</button>
          <img src="" alt="" class="lightbox-img" id="lightboxImg">
          <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
      `;
      document.body.appendChild(lightboxModal);

      const closeBtn = lightboxModal.querySelector('.lightbox-close');
      const backdrop = lightboxModal.querySelector('.lightbox-backdrop');

      function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }

      closeBtn.addEventListener('click', closeLightbox);
      backdrop.addEventListener('click', closeLightbox);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
          closeLightbox();
        }
      });
    }

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const fullSrc = trigger.getAttribute('data-lightbox') || trigger.getAttribute('src');
        const altText = trigger.getAttribute('data-caption') || trigger.getAttribute('alt') || '';
        if (fullSrc && lightboxImg) {
          lightboxImg.src = fullSrc;
          lightboxImg.alt = altText;
          if (lightboxCaption) lightboxCaption.textContent = altText;
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }
});
