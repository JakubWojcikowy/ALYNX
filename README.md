# ALYNX Engineering Sp. z o.o. — Oficjalny Serwis Firmowy

[![Status: In Development](https://img.shields.io/badge/status-in--development-yellow.svg)](https://github.com/)
[![Stack: HTML5 / CSS3 / Vanilla JS](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-blue.svg)](https://developer.mozilla.org/)
[![Hosting: Hostido / Static](https://img.shields.io/badge/hosting-Hostido%20%2F%20cPanel%20Ready-green.svg)](https://hostido.pl/)
[![Design: Industrial High-Tech](https://img.shields.io/badge/design-Industrial%20High--Tech-orange.svg)]()
[![Responsive: Mobile First](https://img.shields.io/badge/responsive-mobile--first-brightgreen.svg)]()

> Nowoczesna, wysoce responsywna i lekka strona internetowa dla firmy **ALYNX Engineering Sp. z o.o.** ze Stalowej Woli. Projekt zoptymalizowany pod kątem szybkości ładowania (PageSpeed 95+), bezpośredniej konwersji zapytań ofertowych B2B oraz bezproblemowego wdrożenia na klasycznym hostingu współdzielonym (**Hostido / cPanel / DirectAdmin**).

---

## 🏭 O firmie ALYNX Engineering

**ALYNX Engineering Sp. z o.o.** to przedsiębiorstwo inżynieryjno-produkcyjne zlokalizowane w sercu Centralnego Okręgu Przemysłowego (COP) w Stalowej Woli. Firma specjalizuje się w:
* **Precyzyjnym spawaniu konstrukcji stalowych** (MIG/MAG, TIG — stal czarna, stale nierdzewne, stopy aluminium),
* **Projektowaniu inżynierskim i modelowaniu 3D CAD/CAM** (od koncepcji, przez optymalizację DFM, po dokumentację wykonawczą),
* **Zaawansowanym montażu spawalniczym na modułowych stołach 3D** (System 28 / siatka otworów $100 \times 100$ mm), pozwalającym na realizację zarówno precyzyjnych detali, jak i wielkogabarytowych ram do 6 metrów długości z zachowaniem idealnych kątów i tolerancji.

### Dane rejestrowe i kontaktowe
* **Firma:** ALYNX Engineering Sp. z o.o.
* **Osoba zarządzająca:** Sebastian Ajryś
* **Adres:** ul. Zdzisława Malickiego 118, 37-450 Stalowa Wola
* **NIP:** 8652594538
* **Telefon:** [+48 881 424 247](tel:+48881424247)
* **E-mail:** [biuro@alynx.com.pl](mailto:biuro@alynx.com.pl)

---

## 📐 Kluczowe Moduły i Funkcjonalności

1. **Top Bar & Sticky Navigation**:
   * Szybki kontakt bezpośredni (telefon, e-mail, lokalizacja),
   * Klikalne, responsywne logo z dynamicznym powrotem na górę strony,
   * Przejrzyste menu sekcji z przyciskiem szybkiej wyceny (*Call To Action*).
2. **Hero Section (Strefa Wprowadzająca)**:
   * Wyraziste hasło technologiczne,
   * Kluczowe wskaźniki inżynierskie (tolerancje wymiarowe, czas analizy DFM, powtarzalność),
   * Bezpośrednie punkty wejścia do oferty i formularza zapytania.
3. **Prezentacja Możliwości Technologicznych (Stoły Spawalnicze 3D)**:
   * Dedykowany moduł prezentujący zaplecze spawalnicze w oparciu o modułowe stoły 3D (System 28),
   * Specyfikacja wymiarów bazowych ($3000 \times 1500$ mm, $2400 \times 1200$ mm) z możliwością łączenia w pole robocze $6000 \times 3000$ mm,
   * Wyjaśnienie korzyści dla klienta: eliminacja odkształceń spawalniczych, wysoka powtarzalność seryjna, idealne kąty $90^\circ$.
4. **Katalog Usług**:
   * Spawanie konstrukcji stalowych i ram maszynowych,
   * Modelowanie 3D i dokumentacja CAD/CAM,
   * Montaż i przygotowanie podzespołów,
   * Kontrola jakości i badania wizualne spoin (VT).
5. **Ścieżka Realizacji Krok po Kroku**:
   * 5-etapowy proces B2B: *Zapytanie i pliki CAD &rarr; Wycena &rarr; Ustawienie na stołach 3D &rarr; Spawanie &rarr; Kontrola CMM/VT &rarr; Dostawa*.
6. **Portfolio / Galeria Realizacji**:
   * Nowoczesna siatka projektów z filtrowaniem wg kategorii i łatwym systemem podmiany zdjęć.
7. **Formularz Wyceny / RFP & Kontakt**:
   * Interaktywny formularz zapytania ofertowego ze specyfikacją zlecenia i opcją dołączenia plików technicznych (STEP, DXF, PDF).

---

## 📁 Architektura Plików

Projekt został zaprojektowany w architekturze **Zero-Dependency Static Web** — nie wymaga instalacji Node.js, kompilatorów ani baz danych na serwerze docelowym.

```text
ALYNX/
├── index.html                   # Główna strona aplikacji (semantyczny HTML5)
├── README.md                    # Dokumentacja techniczna i opis projektu
├── .gitignore                   # Reguły wykluczeń dla systemu kontroli wersji Git
├── .gitattributes               # Konfiguracja obsługi końców linii w Git
├── Obszar roboczy 1.png          # Oryginalny plik logo projektu
│
└── assets/
    ├── css/
    │   └── style.css            # Style CSS (Industrial High-Tech, RWD, animacje)
    ├── js/
    │   └── main.js              # Skrypty interaktywne (nawigacja, filtry, walidacja)
    └── images/
        ├── logo.png             # Zoptymalizowane logo do nagłówka i stopki
        ├── hero/                # Zdjęcia sekcji hero (tła, detale spawalnicze)
        ├── services/            # Grafiki i ikony dedykowane usługom
        ├── tables/              # Zdjęcia i schematy modułowych stołów spawalniczych 3D
        └── portfolio/           # Galeria wykonanych konstrukcji i detali
```

---

## 🚀 Wdrożenie na Hostido (Instrukcja Krok po Kroku)

Dzięki bezstanowej strukturze statycznej, wdrożenie strony na serwerze **Hostido** (lub dowolnym innym hostingu WWW) zajmuje poniżej 1 minuty:

1. **Zaloguj się do panelu Hostido** (cPanel / DirectAdmin).
2. Otwórz **Menadżer Plików** (*File Manager*) lub połącz się przez **FTP / SFTP** (np. programem FileZilla).
3. Przejdź do katalogu głównego Twojej domeny (zazwyczaj jest to folder `public_html` lub `public_html/twojadomena.pl`).
4. **Skopiuj zawartość folderu `ALYNX`**:
   * Plik `index.html` musi znajdować się bezpośrednio w folderze `public_html`.
   * Skopiuj cały katalog `assets/` wraz z podfolderami `css/`, `js/`, `images/`.
5. Strona jest natychmiast widoczna pod Twoją domeną z certyfikatem SSL.

---

## 🛠️ Stack Technologiczny

* **Języki:** HTML5 (semantyka, accessibility ARIA), CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism), Vanilla JavaScript (ES6+).
* **Typografia:** Nowoczesny bezszeryfowy font inżynierski (*Inter / Syne*) + akcenty techniczne (*JetBrains Mono*).
* **Kolorystyka:** 
  * Głębia i kontrast: `Slate / Dark Industrial` (`#0B0F19`, `#1E293B`)
  * Akcent energetyczny: `Laser Electric Blue` (`#0284C7` / `#38BDF8`) & `Steel Amber` (`#F59E0B`)
  * Tła techniczne: Siatki inżynierskie (blueprint grid) i subtelne linie wymiarowe.
* **Wersjonowanie:** Git (Semantic Commits).

---

## 👨‍💻 Autor i Zarządzanie Wersjami

Projekt realizowany i utrzymywany w systemie kontroli wersji **Git**.

```bash
# Szybki podgląd lokalny (wystarczy uruchomić dowolny serwer statyczny lub otworzyć w przeglądarce):
# Python:
python -m http.server 3000

# Lub po prostu dwuklik na plik index.html
```

---
*Copyright © 2026 ALYNX Engineering Sp. z o.o. Wszelkie prawa zastrzeżone.*
