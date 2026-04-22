<?php

namespace App\Http\Controllers\Api\Conductor;

use Illuminate\Http\Request;

class DocumentoController extends Controller
{
    public function upload(Request $req) {
        $path = $req->file('archivo')->store('documentos');

        return Documento::create([
            'id_conductor' => $req->user()->conductor->id_conductor,
            'tipo' => $req->tipo,
            'ruta_archivo' => $path
        ]);
    }
}
