<?php

namespace App\Http\Controllers\Api\Conductor;

use App\Http\Controllers\Controller;
use App\Models\Documento;
use App\Http\Requests\Conductor\StoreDocumentoRequest;

class DocumentoController extends Controller
{
    public function index() {
        return auth()->user()->conductor->documentos;
    }

    public function upload(StoreDocumentoRequest $req) {
        $path = $req->file('archivo')->store('documentos');

        return Documento::create([
            'id_conductor' => auth()->user()->conductor->id_conductor,
            'tipo' => $req->tipo,
            'ruta_archivo' => $path,
            'fecha_subida' => now()
        ]);
    }
}