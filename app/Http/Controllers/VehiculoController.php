<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use App\Models\Cooperativa;


class VehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehiculos = Vehiculo::all();
        return view('vehiculos.index', compact('vehiculos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $datos = ['exito' => ''];
        if($request->isMethod('post')) {
            $validated = $request->validate([
                'matricula' => 'required|string|max:20',
                'marca' => 'required|string|max:50',
                'modelo' => 'required|string|max:50',
                'plazas' => 'required|integer|min:1',
                'id_cooperativa' => 'required|exists:cooperativas,id_cooperativa',
            ]);

            $vehiculo = new Vehiculo();

            $vehiculo->matricula = $request->input('matricula');
            $vehiculo->marca = $request->input('marca');
            $vehiculo->modelo = $request->input('modelo');
            $vehiculo->plazas = $request->input('plazas');
            $vehiculo->id_cooperativa = $request->input('id_cooperativa');
            $vehiculo->save();
            return redirect()->route('vehiculos.index')->with('success', 'Vehículo creado exitosamente.');
        }
        else
        {
            $datos = ['exito' => ''];
            $vehiculo = new Vehiculo();
            $disabled = '';

            return view('vehiculos.create',['datos' => $datos,'vehiculo' => $vehiculo,'disabled' => $disabled,'oper' => 'create']);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $datos = ['exito' => ''];
        $vehiculo = Vehiculo::find($id);
        return view('vehiculos.create',['datos' => $datos,'vehiculo' => $vehiculo,'disabled' => 'disabled','oper' => 'show']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id = '')
    {
        if ($request->isMethod('post')) {   
            $validated = $request->validate([
                'matricula' => 'required|string|max:20',
                'marca' => 'required|string|max:50',
                'modelo' => 'required|string|max:50',
                'plazas' => 'required|integer|min:1',
                'id_cooperativa' => 'required|exists:cooperativas,id_cooperativa',
            ]);

            $vehiculo = Vehiculo::find($request->input('id'));
            $vehiculo->matricula = $request->input('matricula');
            $vehiculo->marca = $request->input('marca');
            $vehiculo->modelo = $request->input('modelo');
            $vehiculo->plazas = $request->input('plazas');
            $vehiculo->id_cooperativa = $request->input('id_cooperativa');
            $vehiculo->save();
            return redirect()->route('vehiculos.index')->with('success', 'Vehículo actualizado exitosamente.');
        }
        else
        {
            $datos = ['exito' => ''];
            $vehiculo = Vehiculo::find($request->input('id'));
            $disabled = '';

            return view('vehiculos.create',['datos' => $datos,'vehiculo' => $vehiculo,'disabled' => $disabled,'oper' => 'edit']);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id = '')
    {
        if ($request->isMethod('post')) {   
            $vehiculo = Vehiculo::find($request->input('id'));
            $vehiculo->delete();
            return redirect()->route('vehiculos.index')->with('success', 'Vehículo eliminado exitosamente.');
        }
        else
        {
            $datos = ['exito' => ''];
            $vehiculo = Vehiculo::find($request->input('id'));
            $disabled = 'disabled';

            return view('vehiculos.create',['datos' => $datos,'vehiculo' => $vehiculo,'disabled' => $disabled,'oper' => 'destroy']);
        }
    }
}
