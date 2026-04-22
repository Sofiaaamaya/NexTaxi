<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $req) {
        $user = Usuario::create([
            'nombre' => $req->nombre,
            'email' => $req->email,
            'password' => bcrypt($req->password)
        ]);

        return response()->json($user);
    }

    public function login(Request $req) {
        if (!Auth::attempt($req->only('email','password'))) {
            return response()->json(['error'=>'Credenciales incorrectas'],401);
        }

        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;

        return ['token'=>$token,'user'=>$user];
    }
}
