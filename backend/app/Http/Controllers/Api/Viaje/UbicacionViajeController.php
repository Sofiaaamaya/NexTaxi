<?php

namespace App\Http\Controllers\Api\Viaje;

use App\Http\Controllers\Controller;
use App\Models\UbicacionViaje;
use Illuminate\Http\Request;

class UbicacionViajeController extends Controller
{
    public function store(Request $request, $id_viaje) {
        $request->validate([
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric'
        ]);

        return UbicacionViaje::create([
            'id_viaje' => $id_viaje,
            'latitud' => $request->latitud,
            'longitud' => $request->longitud,
            'fecha_registro' => now()
        ]);
    }

    public function index($id_viaje) {
        return UbicacionViaje::where('id_viaje', $id_viaje)
            ->orderBy('fecha_registro', 'asc')
            ->get();
    }
}