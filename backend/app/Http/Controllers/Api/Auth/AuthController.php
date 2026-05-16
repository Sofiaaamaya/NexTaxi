<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Invitacion;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Google\Client as Google_Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\RecuperarPasswordMail;

class AuthController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = Usuario::where('email', $request->email)->first();

        if (!$user) {
            // Por seguridad, no decimos si el email existe o no
            return response()->json(['msg' => 'Si el correo electrónico existe, se ha enviado un enlace de recuperación.']);
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        Mail::to($request->email)->send(new RecuperarPasswordMail($token, $request->email));

        return response()->json(['msg' => 'Si el correo electrónico existe, se ha enviado un enlace de recuperación.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $reset = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$reset || !Hash::check($request->token, $reset->token)) {
            return response()->json(['error' => 'Token inválido o expirado'], 400);
        }

        // Verificar expiración (1 hora)
        if (Carbon::parse($reset->created_at)->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json(['error' => 'El enlace ha expirado'], 400);
        }

        $user = Usuario::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $user->update(['password' => Hash::make($request->password)]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['msg' => 'Contraseña actualizada con éxito']);
    }

    public function googleLogin(Request $request)
    {
        $request->validate(['token' => 'required']);

        try {
            $clientId = config('services.google.client_id');
            
            if (!$clientId) {
                return response()->json([
                    'error' => 'Configuración de Google incompleta en el servidor',
                    'message' => 'Falta GOOGLE_CLIENT_ID en el archivo .env del backend'
                ], 500);
            }

            $client = new Google_Client(['client_id' => $clientId]);
            $payload = $client->verifyIdToken($request->token);

            if (!$payload) {
                return response()->json(['error' => 'Token de Google inválido o expirado'], 401);
            }

            $email = $payload['email'];
            $nombre = $payload['name'];

            $user = Usuario::where('email', $email)->first();

            if (!$user) {
                // Registro automático si no existe
                $user = Usuario::create([
                    'nombre'   => $nombre,
                    'email'    => $email,
                    'password' => Hash::make(Str::random(16)),
                    'rol'      => 'cliente',
                ]);
            }

            // Revocar tokens anteriores
            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'msg'   => 'Login exitoso con Google',
                'user'  => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error en la autenticación con Google',
                'message' => $e->getMessage(),
                'hint' => 'Asegúrate de que el backend pueda conectar con los servidores de Google y que el token enviado sea válido.',
                'trace' => config('app.debug') ? $e->getTrace() : null
            ], 500);
        }
    }

    public function register(RegisterRequest $req) {
    $rol = 'cliente';
    $invitacion = null;

    if ($req->has('token')) {
        $invitacion = Invitacion::where('token', $req->token)
            ->where('usado', false)
            ->where('expiracion', '>', Carbon::now())
            ->first();

        if (!$invitacion) {
            return response()->json(['error' => 'Invitación inválida, usada o expirada.'], 400);
        }

        if ($invitacion->email !== $req->email) {
            return response()->json(['error' => 'El email no coincide con el de la invitación.'], 400);
        }

        $rol = $invitacion->rol;
    }

    return DB::transaction(function () use ($req, $rol, $invitacion) {
        $user = Usuario::create([
            'nombre'   => $req->nombre,
            'email'    => $req->email,
            'password' => bcrypt($req->password),
            'telefono' => $req->telefono ?? null,
            'rol'      => $rol,
        ]);

        if ($invitacion) {
            $invitacion->update(['usado' => true]);
        }

        $token = $user->createToken('auth_token')->plainTextToken; // ← $user

        return response()->json([
            'msg'   => 'Registro completado con éxito',
            'user'  => $user,
            'token' => $token,
        ], 201);
    });
}

public function login(LoginRequest $req) {
    $user = Usuario::where('email', $req->email)->first();

    if (!$user || !\Illuminate\Support\Facades\Hash::check($req->password, $user->password)) {
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }

    // Revocar tokens anteriores (opcional pero recomendado)
    $user->tokens()->delete();

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'msg'   => 'Login exitoso',
        'user'  => $user,
        'token' => $token,
    ]);
}

public function logout() {
    $user = request()->user();
    
    if ($user) {
        // Revocar todos los tokens del usuario (más seguro en tests)
        $user->tokens()->delete();
    }

    return response()->json(['msg' => 'Logout correcto']);
}
}