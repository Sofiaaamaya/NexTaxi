<?php

namespace App\Http\Controllers;

use App\Models\Conductor;
use App\Models\Usuario;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ConductorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conductores = Conductor::with(['usuario', 'vehiculo'])->paginate(10);
        return view('conductores.index', compact('conductores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get users with role 'conductor' who don't have a conductor profile yet, OR just all conductors?
        // Let's filter by role 'conductor'. Ideally we shouldn't allow one user to have multiple conductor profiles.
        $usuarios = Usuario::where('rol', 'conductor')
            ->whereDoesntHave('conductor')
            ->get();

        $vehiculos = Vehiculo::all();

        return view('conductores.create', compact('usuarios', 'vehiculos'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario|unique:conductores,id_usuario',
            'numero_licencia' => 'required|string|max:50|unique:conductores,numero_licencia',
            'id_vehiculo' => 'required|exists:vehiculos,id_vehiculo',
            'estado' => 'required|in:disponible,ocupado,fuera_servicio',
        ]);

        Conductor::create($request->all());

        return redirect()->route('conductores.index')->with('success', 'Conductor registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Conductor $conductor)
    {
        return view('conductores.show', compact('conductor'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conductor $conductor)
    {
        $usuarios = Usuario::where('rol', 'conductor')->get(); // Allow changing user for existing conductor? Maybe restrictive but okay for now.
        $vehiculos = Vehiculo::all();

        return view('conductores.edit', compact('conductor', 'usuarios', 'vehiculos'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conductor $conductor)
    {
        $request->validate([
            'id_usuario' => ['required', 'exists:usuarios,id_usuario', Rule::unique('conductores')->ignore($conductor->id_conductor, 'id_conductor')],
            'numero_licencia' => ['required', 'string', 'max:50', Rule::unique('conductores')->ignore($conductor->id_conductor, 'id_conductor')],
            'id_vehiculo' => 'required|exists:vehiculos,id_vehiculo',
            'estado' => 'required|in:disponible,ocupado,fuera_servicio',
        ]);

        $conductor->update($request->all());

        return redirect()->route('conductores.index')->with('success', 'Conductor actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conductor $conductor)
    {
        $conductor->delete();
        return redirect()->route('conductores.index')->with('success', 'Conductor eliminado exitosamente.');
    }
}