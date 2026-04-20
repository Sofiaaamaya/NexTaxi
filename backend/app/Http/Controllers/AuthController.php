<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Vehiculo;
use App\Models\Conductor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // REGISTRO NORMAL (CLIENTE)
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|min:6',
            'telefono' => 'nullable|string|max:20',
        ]);

        $user = Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'telefono' => $request->telefono,
            'rol' => 'cliente',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = Usuario::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login correcto',
            'user' => $user,
            'token' => $token
        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada']);
    }

    // USUARIO AUTENTICADO

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // REGISTRO DE CONDUCTOR
    // (usuario + vehículo + conductor)

    public function registerDriver(Request $request)
    {
        $request->validate([
            // Usuario
            'nombre' => 'required|string|max:100',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|min:6',
            'telefono' => 'nullable|string|max:20',

            // Vehículo
            'matricula' => 'required|string|unique:vehiculos,matricula',
            'marca' => 'nullable|string|max:50',
            'modelo' => 'nullable|string|max:50',
            'plazas' => 'nullable|integer|min:1',
            'color' => 'nullable|string|max:30',
            'tipo' => 'nullable|string',
            'anio' => 'nullable|integer',

            // Conductor
            'dni' => 'required|string|unique:conductores,dni',
            'numero_licencia' => 'required|string|unique:conductores,numero_licencia',
            'licencia_expira' => 'nullable|date',
        ]);

        // Crear usuario
        $user = Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'telefono' => $request->telefono,
            'rol' => 'conductor',
        ]);

        // Crear vehículo
        $vehiculo = Vehiculo::create([
            'matricula' => $request->matricula,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'plazas' => $request->plazas ?? 4,
            'color' => $request->color,
            'tipo' => $request->tipo ?? 'normal',
            'anio' => $request->anio,
        ]);

        // Crear conductor
        $conductor = Conductor::create([
            'id_usuario' => $user->id_usuario,
            'dni' => $request->dni,
            'numero_licencia' => $request->numero_licencia,
            'licencia_expira' => $request->licencia_expira,
            'id_vehiculo' => $vehiculo->id_vehiculo,
            'estado' => 'fuera_servicio',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Conductor registrado correctamente',
            'user' => $user,
            'vehiculo' => $vehiculo,
            'conductor' => $conductor,
            'token' => $token
        ], 201);
    }
}
