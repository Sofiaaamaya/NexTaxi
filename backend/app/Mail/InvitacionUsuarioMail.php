<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvitacionUsuarioMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
    public $rol;

    public function __construct($token, $rol)
    {
        $this->token = $token;
        $this->rol = $rol;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitación a NexTaxi',
        );
    }

    public function content(): Content
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        // Asegurar que no hay doble barra si la URL ya termina en /
        $baseUrl = rtrim($frontendUrl, '/');
        $url = $baseUrl . '/es/invitacion/aceptar?token=' . $this->token;

        $html = "<h1>¡Hola!</h1>"
              . "<p>Has sido invitado a unirte a NexTaxi como <strong>{$this->rol}</strong>.</p>"
              . "<p>Para comenzar, haz clic en el siguiente enlace:</p>"
              . "<p><a href='{$url}' style='display:inline-block;background:#FACC15;color:black;padding:12px 24px;text-decoration:none;border-radius:12px;font-weight:bold;'>Aceptar Invitación</a></p>"
              . "<p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>"
              . "<p>{$url}</p>"
              . "<p>Esta invitación expirará en 48 horas.</p>";

        return new Content(
            htmlString: $html
        );
    }
}
