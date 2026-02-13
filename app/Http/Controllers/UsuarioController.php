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
    public function create(Request $request)
    {
          $data = ['exito' =>''];

        if ($request->isMethod('post')) {

            $validated = $request->validate([
                'nombre' => 'required|string|max:100',
                'email' => ['required', 'string', 'email', 'max:150'],
                'contraseña' => 'nullable|string|min:8',
                'telefono' => 'nullable|string|max:20',
                'rol' => 'required|in:cliente,conductor,supervisor,administrador',
                'idioma' => 'required|string|max:5',
                'activo' => 'boolean',
            ]);

            $usuario = new Usuario();

            
            $usuario->nombre = $request->input('nombre');
            $usuario->email = $request->input('email');
            $usuario->contraseña = $request->input('contraseña');
            $usuario->telefono = $request->input('telefono');
            $usuario->rol = $request->input('rol');
            $usuario->idioma = $request->input('idioma');
            $usuario->activo = $request->input('activo');

            $usuario->save();   
            
            $data['exito'] = 'Operación realiza correctamente';

        }

        $usuario = new Usuario();


        return view('usuarios.create',['datos' => $data,'usuario' => $usuario, 'disabled' => '','oper' => 'create']);
    }

    



    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $datos = ['exito' => ''];
        $usuario = Usuario::find($request->input('id'));

        return view('usuarios.create',['datos' => $datos,'usuario' => $usuario, 'disabled' => 'disabled','oper' => 'show']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
         if ($request->isMethod('post')) {   

            $validated = $request->validate([
                'nombre' => 'required|string|max:100',
                'email' => ['required', 'string', 'email', 'max:150', Rule::unique('usuarios')->ignore($id, 'id_usuario')],
                'contraseña' => 'nullable|string|min:8',
                'telefono' => 'nullable|string|max:20',
                'rol' => 'required|in:cliente,conductor,supervisor,administrador',
                'idioma' => 'required|string|max:5',
                'activo' => 'boolean',
            ]);

          

            $usuario = Usuario::find($request->input('id'));

            
            $usuario->nombre = $request->input('nombre');
            $usuario->email = $request->input('email');
            $usuario->contraseña = $request->input('contraseña');
            $usuario->telefono = $request->input('telefono');
            $usuario->rol = $request->input('rol');
            $usuario->idioma = $request->input('idioma');
            $usuario->activo = $request->input('activo');

            $usuario->save();   
            
            $datos['exito'] = 'Operación realiza correctamente';
            
            $disabled = 'disabled';
        }
        else
        {
            $datos = ['exito' => ''];
            $usuario = Usuario::find($request->input('id'));
            $disabled = '';
        }

        return view('usuarios.create',['datos' => $datos,'usuario' => $usuario, 'disabled' => $disabled,'oper' => 'edit']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy( Request $request, string $id)
    {
        if ($request->isMethod('post')) {   

            $usuario = Usuario::find($request->input('id'));
            $usuario->delete();
            return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente.');
        }
        else
        {
            $datos = ['exito' => ''];
            $usuario = Usuario::find($request->input('id'));
            $disabled = 'disabled';

            return view('usuarios.create',['datos' => $datos,'usuario' => $usuario, 'disabled' => $disabled,'oper' => 'destroy']);
        }
    }
}