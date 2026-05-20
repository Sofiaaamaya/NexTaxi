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
        $baseUrl = rtrim($frontendUrl, '/');
        // Incluir el prefijo /es/ para evitar redirecciones que pierdan los params
        $url = $baseUrl . '/es/reset-password?token=' . $this->token . '&email=' . urlencode($this->email);

        $html = "<h1>Recuperación de Contraseña</h1>"
              . "<p>Has solicitado restablecer tu contraseña en NexTaxi.</p>"
              . "<p>Haz clic en el siguiente enlace para elegir una nueva contraseña:</p>"
              . "<p><a href='{$url}' style='display:inline-block;background:#FACC15;color:black;padding:12px 24px;text-decoration:none;border-radius:12px;font-weight:bold;'>Restablecer Contraseña</a></p>"
              . "<p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>"
              . "<p>{$url}</p>"
              . "<p>Si no solicitaste este cambio, puedes ignorar este correo.</p>"
              . "<p>Este enlace expirará en 60 minutos.</p>";

        return new Content(
            htmlString: $html
        );
    }
}
