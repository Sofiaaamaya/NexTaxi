<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactoMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactoController extends Controller
{
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'email',
                'regex:/^[\w\-\.]+@([\w\-]+\.)+[a-zA-Z]{2,4}$/',
                'max:255'
            ],
            'subject' => 'required|string|max:100',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'El formato del correo electrónico no es válido.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Sanitización básica
            $email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
            $subject = strip_tags($request->subject);
            $message = strip_tags($request->message);

            $adminEmail = config('mail.from.address');

            Mail::to($adminEmail)->send(new ContactoMail(
                $email,
                $subject,
                $message
            ));

            return response()->json([
                'status' => 'success',
                'message' => 'Mensaje enviado correctamente'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error enviando mail de contacto: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Lo sentimos, hubo un problema al procesar tu solicitud. Por favor, inténtalo más tarde.'
            ], 500);
        }
    }
}
