# ALYNX Engineering — Oficjalny Serwis Firmowy

[![Status: Production Ready](https://img.shields.io/badge/status-production--ready-brightgreen.svg)](https://github.com/)
[![Stack: HTML5 / CSS3 / Vanilla JS](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-blue.svg)](https://developer.mozilla.org/)
[![Hosting: Hostido / Static](https://img.shields.io/badge/hosting-Hostido%20%2F%20DirectAdmin%20Ready-green.svg)](https://hostido.pl/)
[![Responsive: Mobile First](https://img.shields.io/badge/responsive-mobile--first-brightgreen.svg)]()

> Przejrzysta, lekka i wysoce responsywna strona firmowa dla **ALYNX Engineering** ze Stalowej Woli. Zaprojektowana w architekturze statycznej **Zero-Dependency**, zoptymalizowana pod urządzenia mobilne oraz bezpośrednie wdrożenie na hostingu **Hostido** bez dodatkowych narzędzi budujących.

---

## 🏭 O firmie ALYNX Engineering

**ALYNX Engineering** to nowoczesna firma inżynieryjno-produkcyjna zlokalizowana w samym sercu strefy przemysłowej w Stalowej Woli. Zakład specjalizuje się w projektowaniu oraz wytwarzaniu skomplikowanych konstrukcji stalowych, kompletnych linii produkcyjnych, części maszyn oraz oprzyrządowania dla przemysłu kolejowego, energetycznego, offshore, zbrojeniowego, budowlanego i spożywczego.

### Główne obszary działalności
* **Spawanie i produkcja specjalistycznych konstrukcji stalowych (MIG/MAG & TIG)** — stal węglowa, nierdzewna oraz kwasoodporna; praca na hali z dwiema suwnicami 5t i profesjonalnych stołach spawalniczych.
* **Hydrodynamiczne malowanie natryskowe i przygotowanie powierzchni** — własne automatyczne i ręczne śrutownie oraz wydajna malarnia przemysłowa (powłoki epoksydowe, poliuretanowe, cynkowe).
* **Wielkogabarytowa obróbka CNC i precyzyjne cięcie blach** — kompleksowa koordynacja frezowania, toczenia, wytaczania CNC oraz cięcia laserowego i plazmowo-tlenowego we współpracy ze sprawdzoną siecią podwykonawców.
* **Projektowanie CAD, dokumentacja techniczna i nadzór inżynieryjny** — własne biuro projektowo-technologiczne (modele 3D CAD, dokumentacja 2D, inżynieria odwrotna i optymalizacja kosztów).
* **Kontrola jakości i wysokie standardy produkcyjne** — staranne przygotowanie materiału, kontrola spoin, weryfikacja wymiarowa na stołach i po CNC, pomiary grubości powłok oraz identyfikowalność (atesty 3.1).

### Dane rejestrowe i kontaktowe
* **Firma:** ALYNX Engineering
* **Osoba kontaktowa:** Sebastian Ajryś
* **Adres:** ul. Zdzisława Malickiego 118, 37-450 Stalowa Wola
* **NIP:** 8652594538
* **Telefon:** [+48 881 424 247](tel:+48881424247)
* **E-mail:** [biuro@alynx.com.pl](mailto:biuro@alynx.com.pl)

---

## 📁 Architektura Plików

```text
ALYNX/
├── index.html                   # Strona główna
├── oferta.html                  # Szczegółowa oferta usług (5 filarów)
├── realizacje.html              # Podstrona Realizacje (w trakcie przygotowania zdjęć)
├── o-nas.html                   # Profil firmy, zaplecze i atuty współpracy
├── kontakt.html                 # Dane kontaktowe i formularz wyceny
├── README.md                    # Dokumentacja projektu
└── assets/
    ├── css/
    │   └── style.css            # Arkusz stylów (Mobile-first RWD, Forest Green & Slate)
    ├── js/
    │   └── main.js              # Nawigacja mobilna, płynne przewijanie, obsługa formularza
    └── images/
        ├── logo.png             # Oficjalne logo z przezroczystym tłem (header/footer)
        ├── favicon.png          # Ikona karty przeglądarki
        ├── hero/                # Tło sekcji powitalnej
        ├── services/            # Zdjęcia ilustrujące poszczególne obszary oferty
        └── tables/              # Zdjęcie zaplecza hali produkcyjnej
```

---

## 🚀 Wdrożenie na Hostido (Krok po kroku)

1. **Zaloguj się do panelu Hostido** (DirectAdmin / cPanel) i otwórz **Menadżer Plików** (lub połącz się przez FTP / FileZilla).
2. Wejdź do katalogu publicznego swojej domeny (najczęściej `public_html`).
3. **Wgraj wyłącznie pliki produkcyjne strony**:
   * Wszystkie 5 plików HTML: `index.html`, `oferta.html`, `realizacje.html`, `o-nas.html`, `kontakt.html`
   * Cały folder `assets/` wraz z podfolderami (`css/`, `js/`, `images/`).
   *(Folder `materiały/`, `Obszar roboczy 1.png` oraz `README.md` są plikami roboczymi/źródłowymi i nie muszą być kopiowane na serwer WWW).*
4. Strona działa natychmiast pod Twoją domeną — bez bazy danych, PHP i budowania po stronie serwera.

---

## 🛠️ Stack Technologiczny

* **Języki:** HTML5 (semantyka i ARIA), CSS3 (Custom Properties, Grid, Flexbox, RWD), Vanilla JavaScript (ES6+).
* **Kolorystyka:** Czysta biel (`#FFFFFF`), jasna szarość przemysłowa (`#F8FAFC`), grafit/łupkowy (`#0F172A`) oraz zieleń przemysłowa (`#15803D`).
* **Typografia:** *Inter*.

---
*Copyright © 2026 ALYNX Engineering. Wszelkie prawa zastrzeżone.*
