<?php

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


$response = [];

try {
    // Verifica che i dati del form siano presenti
    if (!isset($_POST['nameForm'], $_POST['emailForm'], $_POST['subjectForm'], $_POST['messageForm'])) {
        throw new Exception('Dati mancanti nel form.');
    }

    // Sanitizzazione e validazione dei dati
    $name = trim($_POST['nameForm']);
    $email = trim($_POST['emailForm']);
    $subject = trim($_POST['subjectForm']);
    $message = trim($_POST['messageForm']);

    // Verifica se il nome è vuoto
    if (empty($name)) {
        throw new Exception('Il nome non può essere vuoto.');
    }

    // Verifica se l'email è valida
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Indirizzo email non valido.');
    }

    // Verifica se l'oggetto è vuoto
    if (empty($subject)) {
        throw new Exception('L\'oggetto non può essere vuoto.');
    }

    // Verifica se il messaggio è vuoto
    if (empty($message)) {
        throw new Exception('Il messaggio non può essere vuoto.');
    }

    // Rimuove eventuali tag HTML o script per evitare attacchi XSS
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $subject = htmlspecialchars($subject);
    $message = htmlspecialchars($message);

    // Crea una nuova istanza di PHPMailer
    $mail = new PHPMailer(true);

    // Imposta i parametri di connessione del server SMTP
    $mail->isSMTP();
    $mail->Host = 'sandbox.smtp.mailtrap.io';  // Puoi usare SMTP di altri provider (ad esempio Gmail)
    $mail->SMTPAuth = true;
    $mail->Username = 'e84b2b903a9022';  // Username SMTP
    $mail->Password = '11ab0423d2ca1a';  // Password SMTP
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 2525;

    // Imposta l'indirizzo mittente e il destinatario
    $mail->setFrom($email, $name);
    $mail->addAddress('destinatario@example.com', 'Nome Destinatario');

    // Imposta l'oggetto e il corpo dell'email
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body    = "Nome: $name\n\nEmail: $email\n\nMessaggio:\n$message";

    // Invia l'email
    if ($mail->send()) {
        $response['status'] = 'success';
        $response['message'] = 'Grazie per il tuo messaggio! A breve riceverai una risposta.';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Errore durante l\'invio dell\'email';
    }
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = 'Mailer Error: ' .  $mail->ErrorInfo . ' \n' . $e->getMessage();
}

// Ritorna la risposta in formato JSON
echo json_encode($response);
