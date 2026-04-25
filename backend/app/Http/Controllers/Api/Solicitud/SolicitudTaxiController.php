<?php

namespace App\Http\Controllers\Api\Solicitud;

use App\Http\Controllers\Controller;
use App\Models\SolicitudTaxi;
use App\Http\Requests\Solicitud\StoreSolicitudRequest;

class SolicitudTaxiController extends Controller
{
    public function store(StoreSolicitudRequest $req) {
        return SolicitudTaxi::create([
            ...$req->validated(),
            'id_cliente' => auth()->id(),
            'fecha_solicitud' => now()
        ]);
    }

    public function index() {
        return SolicitudTaxi::with('viaje')->get();
    }
}