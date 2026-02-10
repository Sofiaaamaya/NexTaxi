<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = Usuario::orderBy('created_at', 'desc')->paginate(10);
        return view('usuarios.index', compact('usuarios'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('usuarios.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => 'required|string|email|max:150|unique:usuarios',
            'contraseña' => 'required|string|min:8',
            'telefono' => 'nullable|string|max:20',
            'rol' => 'required|in:cliente,conductor,supervisor,administrador',
            'idioma' => 'required|string|max:5',
            'activo' => 'boolean',
        ]);

        Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'contraseña' => Hash::make($request->contraseña),
            'telefono' => $request->telefono,
            'rol' => $request->rol,
            'idioma' => $request->idioma,
            'activo' => $request->has('activo'),
        ]);

        return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        return view('usuarios.show', compact('usuario'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        return view('usuarios.edit', compact('usuario'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario $usuario)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => ['required', 'string', 'email', 'max:150', Rule::unique('usuarios')->ignore($usuario->id_usuario, 'id_usuario')],
            'contraseña' => 'nullable|string|min:8',
            'telefono' => 'nullable|string|max:20',
            'rol' => 'required|in:cliente,conductor,supervisor,administrador',
            'idioma' => 'required|string|max:5',
            'activo' => 'boolean',
        ]);

        $data = $request->except(['contraseña', 'activo']);
        $data['activo'] = $request->has('activo');

        if ($request->filled('contraseña')) {
            $data['contraseña'] = Hash::make($request->contraseña);
        }

        $usuario->update($data);

        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();
        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente.');
    }
}