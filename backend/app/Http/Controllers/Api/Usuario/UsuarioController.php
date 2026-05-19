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

    public function updateProfile(\Illuminate\Http\Request $request) {
        $usuario = $request->user();
        
        $request->validate([
            'foto_perfil' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto_perfil')) {
            $path = $request->file('foto_perfil')->store('perfiles', 'public');
            $usuario->foto_perfil = $path;
        }

        $usuario->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $usuario
        ]);
    }
}