<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RecuperarPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
    public $email;

    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Recuperar Contraseña - NexTaxi',
        );
    }

    public function content(): Content
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        // Usamos la ruta que crearemos en el frontend
        $url = $frontendUrl . '/reset-password?token=' . $this->token . '&email=' . urlencode($this->email);

        $html = "<h1>Recuperación de Contraseña</h1>"
              . "<p>Has solicitado restablecer tu contraseña en NexTaxi.</p>"
              . "<p>Haz clic en el siguiente enlace para elegir una nueva contraseña:</p>"
              . "<p><a href='{$url}' style='display:inline-block;background:#1e3a8a;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;'>Restablecer Contraseña</a></p>"
              . "<p>Si no solicitaste este cambio, puedes ignorar este correo.</p>"
              . "<p>Este enlace expirará en 60 minutos.</p>";

        return new Content(
            htmlString: $html
        );
    }
}
