<?php

namespace App\Http\Controllers\Api\Viaje;

use App\Http\Controllers\Controller;
use App\Models\Viaje;
use App\Models\SolicitudTaxi;
use App\Http\Requests\Viaje\UpdateViajeRequest;

class ViajeController extends Controller
{
    public function index() {
        return Viaje::with('conductor','solicitud')->get();
    }

    public function aceptar($id) {
        $solicitud = SolicitudTaxi::findOrFail($id);

        $viaje = Viaje::create([
            'id_solicitud' => $id,
            'id_conductor' => auth()->user()->conductor->id_conductor
        ]);

        $solicitud->update([
            'estado' => 'asignada',
            'id_viaje' => $viaje->id_viaje
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