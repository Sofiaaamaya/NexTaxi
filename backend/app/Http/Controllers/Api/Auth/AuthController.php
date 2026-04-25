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

            // Validar que el email coincida con la invitación
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
                'telefono' => $req->telefono,
                'rol'      => $rol,
            ]);

            if ($invitacion) {
                $invitacion->update(['usado' => true]);
            }

            // Opcional: Para login automático tras registro con cookies
            // Auth::login($user);

            return response()->json([
                'msg' => 'Registro completado con éxito',
                'user' => $user
            ], 201);
        });
    }


    public function login(LoginRequest $req) {
        if (!Auth::attempt($req->only('email','password'))) {
            return response()->json(['error'=>'Credenciales incorrectas'], 401);
        }

        $req->session()->regenerate();

        $user = Auth::user();
        
        return response()->json([
            'user' => $user,
            'msg' => 'Login exitoso'
        ]);
    }

    public function logout() {
        Auth::guard('web')->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        
        return response()->json(['msg'=>'Logout correcto']);
    }
}