<?php

namespace App\Http\Controllers\Api\Viaje;

use App\Http\Controllers\Controller;
use App\Models\Viaje;
use App\Models\SolicitudTaxi;
use App\Http\Requests\Viaje\UpdateViajeRequest;
use Illuminate\Http\Request;

class ViajeController extends Controller
{
    public function index() {
        $user = auth()->user();
        $query = Viaje::with(['conductor.usuario', 'conductor.vehiculo', 'solicitud', 'ubicaciones'])
            ->orderBy('created_at', 'desc');

        if ($user->rol === 'conductor') {
            $query->where('id_conductor', $user->conductor->id_conductor);
        } elseif ($user->rol === 'cliente') {
            $query->whereHas('solicitud', function($q) use ($user) {
                $q->where('id_cliente', $user->id_usuario);
            });
        }

        return $query->get();
    }

    public function activa() {
        $user = auth()->user();
        $query = Viaje::with(['conductor.usuario', 'conductor.vehiculo', 'solicitud', 'ubicaciones'])
            ->whereIn('estado', ['asignado', 'en_camino', 'recogido']);

        if ($user->rol === 'conductor') {
            $query->where('id_conductor', $user->conductor->id_conductor);
        } elseif ($user->rol === 'cliente') {
            $query->whereHas('solicitud', function($q) use ($user) {
                $q->where('id_cliente', $user->id_usuario);
            });
        }

        $viaje = $query->first();
        
        if (!$viaje) {
            return response()->json(['message' => 'No hay viajes activos', 'active' => false], 200);
        }

        return $viaje;
    }

    public function show($id) {
        return Viaje::with(['conductor.usuario', 'conductor.vehiculo', 'solicitud', 'ubicaciones'])->findOrFail($id);
    }

    public function aceptar($id) {
        $solicitud = SolicitudTaxi::findOrFail($id);

        if ($solicitud->estado !== 'pendiente') {
            return response()->json(['message' => 'La solicitud ya no está disponible'], 400);
        }

        $viaje = Viaje::create([
            'id_solicitud' => $id,
            'id_conductor' => auth()->user()->conductor->id_conductor,
            'estado' => 'en_camino'
        ]);

        $solicitud->update([
            'estado' => 'asignada',
            'id_viaje' => $viaje->id_viaje
        ]);

        return $viaje;
    }

    public function recoger($id) {
        $viaje = Viaje::findOrFail($id);
        $viaje->update([
            'estado' => 'recogido',
            'inicio_viaje' => now()
        ]);
        return $viaje;
    }

    public function completar(Request $request, $id) {
        $viaje = Viaje::with('solicitud')->findOrFail($id);
        
        $request->validate([
            'precio_final' => 'required|numeric|min:0',
            'destino_direccion' => 'required|string',
            'destino_lat' => 'nullable|numeric',
            'destino_lng' => 'nullable|numeric',
        ]);

        $viaje->update([
            'estado' => 'completado',
            'fin_viaje' => now(),
            'precio_final' => $request->precio_final
        ]);

        // Actualizar el destino final (obligatorio al terminar)
        $viaje->solicitud->update([
            'destino_direccion' => $request->destino_direccion,
            'destino_lat' => $request->destino_lat ?? $viaje->solicitud->destino_lat,
            'destino_lng' => $request->destino_lng ?? $viaje->solicitud->destino_lng,
        ]);

        return $viaje;
    }

    public function actualizarEstado(UpdateViajeRequest $req, $id) {
        $viaje = Viaje::findOrFail($id);
        $viaje->estado = $req->estado;
        $viaje->save();

        return $viaje;
    }
}