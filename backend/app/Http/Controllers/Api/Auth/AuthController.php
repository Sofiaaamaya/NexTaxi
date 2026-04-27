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

class AuthController extends Controller
{
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
    // Revocar el token actual
    request()->user()->currentAccessToken()->delete();

    return response()->json(['msg' => 'Logout correcto']);
}
}