<?php

namespace App\Http\Controllers\Api\Solicitud;

use Illuminate\Http\Request;

class SolicitudTaxiController extends Controller
{
    public function store(Request $req) {
        return SolicitudTaxi::create($req->all());
    }

    public function index() {
        return SolicitudTaxi::with('viaje')->get();
    }
}
