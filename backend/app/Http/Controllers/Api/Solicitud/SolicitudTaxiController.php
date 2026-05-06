<?php

namespace App\Http\Controllers\Api\Solicitud;

use App\Http\Controllers\Controller;
use App\Models\SolicitudTaxi;
use App\Http\Requests\Solicitud\StoreSolicitudRequest;

class SolicitudTaxiController extends Controller
{
    public function store(StoreSolicitudRequest $req) {
        $data = $req->validated();
        $data['id_cliente'] = auth('sanctum')->id();
        $data['fecha_solicitud'] = now();
        
        return SolicitudTaxi::create($data);
    }

    public function index() {
        return SolicitudTaxi::with('viaje')->get();
    }
}