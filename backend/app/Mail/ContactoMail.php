<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ContactoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $subjectText;
    public $messageText;

    /**
     * Create a new message instance.
     */
    public function __construct($email, $subjectText, $messageText)
    {
        $this->email = $email;
        $this->subjectText = $subjectText;
        $this->messageText = $messageText;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->email),
            subject: 'Nuevo mensaje de contacto: ' . $this->subjectText,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $html = "<h1>Nuevo mensaje de contacto</h1>"
              . "<p><strong>De:</strong> {$this->email}</p>"
              . "<p><strong>Asunto:</strong> {$this->subjectText}</p>"
              . "<p><strong>Mensaje:</strong></p>"
              . "<p style='white-space: pre-wrap;'>{$this->messageText}</p>";

        return new Content(
            htmlString: $html
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
