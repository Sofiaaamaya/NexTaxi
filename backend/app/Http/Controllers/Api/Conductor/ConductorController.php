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
            // Datos del vehículo opcionales si se quiere crear uno nuevo
            'matricula' => 'required_without:id_vehiculo|nullable|string|unique:vehiculos,matricula',
            'marca' => 'required_with:matricula|nullable|string',
            'modelo' => 'required_with:matricula|nullable|string',
            'color' => 'nullable|string',
            'tipo' => 'nullable|in:normal,adaptado,premium',
            'anio' => 'nullable|integer',
        ]);

        return DB::transaction(function () use ($validated) {
            $usuario = Usuario::create([
                'nombre' => $validated['nombre'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'rol' => 'conductor'
            ]);

            $id_vehiculo = $validated['id_vehiculo'] ?? null;

            if (!$id_vehiculo && isset($validated['matricula'])) {
                $vehiculo = \App\Models\Vehiculo::create([
                    'matricula' => $validated['matricula'],
                    'marca' => $validated['marca'],
                    'modelo' => $validated['modelo'],
                    'color' => $validated['color'] ?? 'Blanco',
                    'tipo' => $validated['tipo'] ?? 'normal',
                    'anio' => $validated['anio'] ?? date('Y'),
                    'id_cooperativa' => \App\Models\Cooperativa::first()?->id_cooperativa
                ]);
                $id_vehiculo = $vehiculo->id_vehiculo;
            }

            $conductor = Conductor::create([
                'id_usuario' => $usuario->id_usuario,
                'dni' => $validated['dni'],
                'numero_licencia' => $validated['numero_licencia'],
                'id_vehiculo' => $id_vehiculo,
                'estado' => 'fuera_servicio',
                'estado_verificacion' => 'pendiente'
            ]);

            return response()->json($conductor->load('usuario', 'vehiculo'), 201);
        });
    }

    public function update(Request $request, $id) {
        $conductor = Conductor::findOrFail($id);
        $usuario = $conductor->usuario;
        $vehiculo = $conductor->vehiculo;

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'email' => 'sometimes|required|email|unique:usuarios,email,' . $usuario->id_usuario . ',id_usuario',
            'dni' => 'sometimes|required|string|unique:conductores,dni,' . $conductor->id_conductor . ',id_conductor',
            'numero_licencia' => 'sometimes|required|string|unique:conductores,numero_licencia,' . $conductor->id_conductor . ',id_conductor',
            'estado' => 'sometimes|required|in:disponible,ocupado,fuera_servicio',
            'estado_verificacion' => 'sometimes|required|in:pendiente,aprobado,rechazado',
            // Datos del vehículo
            'matricula' => 'sometimes|required|string|unique:vehiculos,matricula,' . ($vehiculo?->id_vehiculo ?? 'NULL') . ',id_vehiculo',
            'marca' => 'sometimes|required|string',
            'modelo' => 'sometimes|required|string',
            'color' => 'sometimes|nullable|string',
            'tipo' => 'sometimes|nullable|in:normal,adaptado,premium',
            'anio' => 'sometimes|nullable|integer',
        ]);

        DB::transaction(function () use ($conductor, $usuario, $vehiculo, $validated) {
            if (isset($validated['nombre'])) $usuario->nombre = $validated['nombre'];
            if (isset($validated['email'])) $usuario->email = $validated['email'];
            $usuario->save();

            if ($vehiculo) {
                $vehiculo->fill($validated);
                $vehiculo->save();
            }

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