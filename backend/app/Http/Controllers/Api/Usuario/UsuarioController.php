<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index() {
        return Usuario::all();
    }

    public function show($id) {
        return Usuario::findOrFail($id);
    }
}