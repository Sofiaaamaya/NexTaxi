<?php

namespace App\Http\Controllers\Api\Viaje;

use Illuminate\Http\Request;

class ViajeController extends Controller
{
    public function aceptar($id, Request $req) {
        $viaje = Viaje::create([
            'id_solicitud' => $id,
            'id_conductor' => $req->user()->conductor->id_conductor
        ]);

        return $viaje;
    }

    public function actualizarEstado(Request $req, $id) {
        $viaje = Viaje::findOrFail($id);
        $viaje->estado = $req->estado;
        $viaje->save();

        return $viaje;
    }
}

