<?php

namespace App\Http\Controllers\Api\Conductor;

use App\Http\Controllers\Controller;
use App\Models\Conductor;
use App\Http\Requests\Admin\ValidarConductorRequest;

class ConductorController extends Controller
{
    public function index() {
        return Conductor::with('usuario','vehiculo')->get();
    }

    public function perfil() {
        return auth()->user()->conductor;
    }

    public function validar(ValidarConductorRequest $req, $id) {
        $conductor = Conductor::findOrFail($id);
        $conductor->estado_verificacion = $req->estado_verificacion;
        $conductor->save();

        return $conductor;
    }
}