<?php

namespace App\Http\Controllers\Api\Vehiculo;

use App\Http\Controllers\Controller;
use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index() {
        return Vehiculo::all();
    }

    public function store(Request $req) {
        $req->validate([
            'matricula'=>'required|unique:vehiculos',
            'marca'=>'required',
            'modelo'=>'required'
        ]);

        return Vehiculo::create($req->all());
    }

    public function show($id) {
        return Vehiculo::findOrFail($id);
    }

    public function update(Request $req, $id) {
        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->update($req->all());
        return $vehiculo;
    }

    public function destroy($id) {
        Vehiculo::destroy($id);
        return response()->json(['msg'=>'Eliminado']);
    }
}