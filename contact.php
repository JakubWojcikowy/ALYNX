<?php
/**
 * ALYNX Engineering — Skrypt obsługi formularza kontaktowego (Hostido / PHP)
 * Bezpieczna wysyłka wiadomości na biuro@alynx.com.pl
 */

// Nagłówek odpowiedzi JSON
header('Content-Type: application/json; charset=utf-8');

// Akceptujemy wyłącznie zapytania POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Niedozwolona metoda żądania (tylko POST).']);
    exit;
}

// Ochrona przed botami (honeypot - pole botcheck musi być puste)
if (!empty($_POST['botcheck'])) {
    // Ciche odrzucenie spamu
    echo json_encode(['success' => true, 'message' => 'Wysłano.']);
    exit;
}

// Pobranie i oczyszczenie pól
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$phone   = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$email   = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$service = isset($_POST['service']) ? trim(strip_tags($_POST['service'])) : 'Zapytanie ogólne';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Walidacja danych
$errors = [];

if (empty($name) || mb_strlen($name) < 2) {
    $errors[] = 'Proszę podać imię i nazwisko lub nazwę firmy.';
}

if (empty($phone) || mb_strlen($phone) < 6) {
    $errors[] = 'Proszę podać prawidłowy numer telefonu.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Proszę podać poprawny adres e-mail.';
}

if (empty($message) || mb_strlen($message) < 5) {
    $errors[] = 'Proszę wpisać treść zapytania / opis konstrukcji.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors), 'errors' => $errors]);
    exit;
}

// Adres docelowy
$to = 'biuro@alynx.com.pl';

// Temat wiadomości
$subject = "=?UTF-8?B?" . base64_encode("[Zapytanie ALYNX] {$service} — {$name}") . "?=";

// Treść wiadomości
$email_body = "Otrzymano nowe zapytanie ze strony internetowej ALYNX Engineering:\n\n";
$email_body .= "------------------------------------------------------------\n";
$email_body .= "Imię i nazwisko / Firma: " . $name . "\n";
$email_body .= "Numer telefonu:          " . $phone . "\n";
$email_body .= "Adres e-mail:            " . $email . "\n";
$email_body .= "Temat / Zakres prac:     " . $service . "\n";
$email_body .= "Data wysłania:           " . date('Y-m-d H:i:s') . "\n";
$email_body .= "------------------------------------------------------------\n\n";
$email_body .= "Treść wiadomości / opis zlecenia:\n";
$email_body .= $message . "\n\n";
$email_body .= "------------------------------------------------------------\n";
$email_body .= "Wiadomość wygenerowana automatycznie z formularza kontaktowego https://alynx.com.pl\n";

// Nagłówki pocztowe
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=utf-8';
$headers[] = 'From: ALYNX Formularz <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'alynx.com.pl') . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Wysłanie wiadomości
$mail_sent = @mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Dziękujemy! Twoja wiadomość została pomyślnie wysłana bezpośrednio do biura ALYNX Engineering.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Wystąpił problem z wysłaniem wiadomości przez serwer pocztowy. Prosimy o kontakt bezpośredni pod adresem biuro@alynx.com.pl lub telefonicznie: +48 881 424 247.'
    ]);
}
