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
        $rules = [
            'email' => [
                'required',
                'email',
                'regex:/^[\w\-\.]+@([\w\-]+\.)+[a-zA-Z]{2,4}$/',
                'max:255'
            ],
            'subject' => 'required|string|max:100',
            'message' => 'required|string|max:5000',
        ];

        if ($request->subject === 'Oportunidades de Empleo') {
            $rules['cv'] = 'required|file|mimes:pdf|max:5120'; // PDF max 5MB
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Sanitización básica
            $email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
            $subject = strip_tags($request->subject);
            $message = strip_tags($request->message);

            $cvPath = null;
            if ($request->hasFile('cv')) {
                $cvPath = $request->file('cv')->store('cvs');
            }

            $adminEmail = config('mail.from.address');

            Mail::to($adminEmail)->send(new ContactoMail(
                $email,
                $subject,
                $message,
                $cvPath
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
    }}
