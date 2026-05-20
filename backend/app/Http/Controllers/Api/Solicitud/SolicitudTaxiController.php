<?php

namespace App\Http\Controllers\Api\Solicitud;

use App\Http\Controllers\Controller;
use App\Models\SolicitudTaxi;
use App\Http\Requests\Solicitud\StoreSolicitudRequest;

class SolicitudTaxiController extends Controller
{
    public function store(StoreSolicitudRequest $req) {
        $user_id = auth('sanctum')->id();

        // Si no está logueado, intentar vincular por teléfono si el usuario ya existe
        if (!$user_id && $req->telefono_cliente) {
            $userByPhone = \App\Models\Usuario::where('telefono', $req->telefono_cliente)->first();
            if ($userByPhone) {
                $user_id = $userByPhone->id_usuario;
            }
        }

        // Auto-cancelar solicitudes viejas (> 20 min) antes de verificar
        SolicitudTaxi::where('estado', 'pendiente')
            ->where('fecha_solicitud', '<', now()->subMinutes(20))
            ->update(['estado' => 'cancelada']);

        // Verificar si ya tiene una solicitud pendiente (RECIENTE) - SOLO PARA LOGUEADOS O VINCULADOS
        if ($user_id) {
            $tienePendiente = SolicitudTaxi::where('id_cliente', $user_id)
                ->where('estado', 'pendiente')
                ->exists();

            if ($tienePendiente) {
                return response()->json(['message' => 'Ya tienes una solicitud de taxi pendiente activa.'], 400);
            }

            // Verificar si ya tiene un viaje activo
            $tieneViajeActivo = \App\Models\Viaje::whereHas('solicitud', function($q) use ($user_id) {
                $q->where('id_cliente', $user_id);
            })->whereIn('estado', ['asignado', 'en_camino', 'recogido'])->exists();

            if ($tieneViajeActivo) {
                return response()->json(['message' => 'Ya tienes un viaje en curso.'], 400);
            }
        }

        $data = $req->validated();
        $data['id_cliente'] = $user_id; // null si es invitado y no hay coincidencia de teléfono
        $data['fecha_solicitud'] = now();
        $data['estado'] = 'pendiente';
        
        return SolicitudTaxi::create($data);
    }

    public function cancelar($id) {
        $solicitud = SolicitudTaxi::findOrFail($id);
        $user_id = auth('sanctum')->id();
        
        // Si la solicitud tiene cliente, verificar que sea el mismo
        if ($solicitud->id_cliente && $solicitud->id_cliente !== $user_id) {
            return response()->json(['message' => 'No tienes permiso para cancelar esta solicitud.'], 403);
        }

        // Si es una solicitud de invitado (id_cliente null), permitir cancelar 
        // por ahora (en producción se podría usar session_id o token temporal)
        // Pero si el usuario está logueado y no es el dueño, se bloqueó arriba.

        if ($solicitud->estado !== 'pendiente') {
            return response()->json(['message' => 'No se puede cancelar una solicitud que ya ha sido aceptada o cancelada.'], 400);
        }

        $solicitud->update(['estado' => 'cancelada']);

        return response()->json(['message' => 'Solicitud cancelada correctamente.']);
    }

    public function index() {
        return SolicitudTaxi::with('viaje')->get();
    }

    public function pendientes() {
        // Auto-cancelar antes de listar para el conductor
        SolicitudTaxi::where('estado', 'pendiente')
            ->where('fecha_solicitud', '<', now()->subMinutes(20))
            ->update(['estado' => 'cancelada']);

        return SolicitudTaxi::with('cliente')
            ->where('estado', 'pendiente')
            ->orderBy('fecha_solicitud', 'desc')
            ->get();
    }
}
