<?php

namespace App\Http\Controllers\Api\Conductor;

use App\Http\Controllers\Controller;
use App\Models\Conductor;
use App\Models\Usuario;
use App\Http\Requests\Admin\ValidarConductorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ConductorController extends Controller
{
    public function index() {
        return Conductor::with('usuario','vehiculo')->get();
    }

    public function show($id) {
        return Conductor::with('usuario', 'vehiculo')->findOrFail($id);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'dni' => 'required|string|unique:conductores,dni',
            'numero_licencia' => 'required|string|unique:conductores,numero_licencia',
            'id_vehiculo' => 'nullable|exists:vehiculos,id_vehiculo',
        ]);

        return DB::transaction(function () use ($validated) {
            $usuario = Usuario::create([
                'nombre' => $validated['nombre'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'rol' => 'conductor'
            ]);

            $conductor = Conductor::create([
                'id_usuario' => $usuario->id_usuario,
                'dni' => $validated['dni'],
                'numero_licencia' => $validated['numero_licencia'],
                'id_vehiculo' => $validated['id_vehiculo'] ?? null,
                'estado' => 'fuera_servicio',
                'estado_verificacion' => 'pendiente'
            ]);

            return response()->json($conductor->load('usuario', 'vehiculo'), 201);
        });
    }

    public function update(Request $request, $id) {
        $conductor = Conductor::findOrFail($id);
        $usuario = $conductor->usuario;

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'email' => 'sometimes|required|email|unique:usuarios,email,' . $usuario->id_usuario . ',id_usuario',
            'dni' => 'sometimes|required|string|unique:conductores,dni,' . $conductor->id_conductor . ',id_conductor',
            'numero_licencia' => 'sometimes|required|string|unique:conductores,numero_licencia,' . $conductor->id_conductor . ',id_conductor',
            'estado' => 'sometimes|required|in:disponible,ocupado,fuera_servicio',
            'estado_verificacion' => 'sometimes|required|in:pendiente,aprobado,rechazado',
        ]);

        DB::transaction(function () use ($conductor, $usuario, $validated) {
            if (isset($validated['nombre'])) $usuario->nombre = $validated['nombre'];
            if (isset($validated['email'])) $usuario->email = $validated['email'];
            $usuario->save();

            $conductor->fill($validated);
            $conductor->save();
        });

        return response()->json($conductor->load('usuario', 'vehiculo'));
    }

    public function destroy($id) {
        $conductor = Conductor::findOrFail($id);
        $usuario = $conductor->usuario;

        DB::transaction(function () use ($conductor, $usuario) {
            $conductor->delete();
            $usuario->delete();
        });

        return response()->json(['message' => 'Conductor eliminado correctamente']);
    }

    public function perfil() {
        return auth()->user()->conductor->load('usuario', 'vehiculo');
    }

    public function validar(ValidarConductorRequest $req, $id) {
        $conductor = Conductor::findOrFail($id);
        $conductor->estado_verificacion = $req->estado_verificacion;
        $conductor->save();

        return $conductor->load('usuario');
    }
}