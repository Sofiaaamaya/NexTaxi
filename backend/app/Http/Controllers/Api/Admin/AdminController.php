<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Conductor;
use App\Models\Invitacion;
use App\Mail\InvitacionUsuarioMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function usuarios() {
        return Usuario::all();
    }

    public function conductores() {
        return Conductor::with('usuario')->get();
    }

    public function invitar(Request $request) {
        $request->validate([
            'email' => 'required|email|unique:usuarios,email',
            'rol'   => 'required|in:conductor,gerente,admin'
        ]);

        $token = Str::random(32);
        
        $invitacion = Invitacion::create([
            'email' => $request->email,
            'rol'   => $request->rol,
            'token' => $token,
            'expiracion' => Carbon::now()->addDays(2),
            'usado' => false
        ]);

        Mail::to($request->email)->send(new InvitacionUsuarioMail($token, $request->rol));

        return response()->json([
            'message' => 'Invitación enviada correctamente',
            'invitacion' => $invitacion
        ]);
    }

    public function validarInvitacion(Request $request) {
        $request->validate(['token' => 'required']);

        $invitacion = Invitacion::where('token', $request->token)
            ->where('usado', false)
            ->where('expiracion', '>', Carbon::now())
            ->first();

        if (!$invitacion) {
            return response()->json(['message' => 'Invitación inválida o expirada'], 404);
        }

        return response()->json([
            'email' => $invitacion->email,
            'rol'   => $invitacion->rol
        ]);
    }

    public function completarRegistro(Request $request) {
        $request->validate([
            'token'    => 'required',
            'nombre'   => 'required|string|max:100',
            'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
            // Datos opcionales para conductores
            'dni'             => 'required_if:rol,conductor|string|max:20',
            'numero_licencia' => 'required_if:rol,conductor|string|max:50',
            'licencia_expira' => 'required_if:rol,conductor|date',
            'matricula'       => 'required_if:rol,conductor|string|max:20',
            'marca'           => 'required_if:rol,conductor|string|max:50',
            'modelo'          => 'required_if:rol,conductor|string|max:50',
            'plazas'          => 'required_if:rol,conductor|integer|min:1|max:8',
            'color'           => 'required_if:rol,conductor|string|max:30',
            'tipo'            => 'required_if:rol,conductor|in:normal,adaptado,premium',
            'anio'            => 'required_if:rol,conductor|integer|min:1900|max:'.(date('Y')+1),
        ], [
            'password.regex' => 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.',
        ]);

        $invitacion = Invitacion::where('token', $request->token)
            ->where('usado', false)
            ->where('expiracion', '>', Carbon::now())
            ->first();

        if (!$invitacion) {
            return response()->json(['message' => 'Invitación inválida o expirada'], 404);
        }

        $usuario = Usuario::create([
            'nombre'   => $request->nombre,
            'email'    => $invitacion->email,
            'password' => bcrypt($request->password),
            'rol'      => $invitacion->rol,
            'telefono' => $request->telefono,
        ]);

        if ($invitacion->rol === 'conductor') {
            $vehiculo = \App\Models\Vehiculo::create([
                'matricula' => $request->matricula,
                'marca'     => $request->marca,
                'modelo'    => $request->modelo,
                'plazas'    => $request->plazas,
                'color'     => $request->color,
                'tipo'      => $request->tipo,
                'anio'      => $request->anio,
            ]);

            \App\Models\Conductor::create([
                'id_usuario'     => $usuario->id_usuario,
                'dni'            => $request->dni,
                'numero_licencia' => $request->numero_licencia,
                'licencia_expira' => $request->licencia_expira,
                'id_vehiculo'    => $vehiculo->id_vehiculo,
                'estado'         => 'fuera_servicio',
                'estado_verificacion' => 'pendiente',
            ]);
        }

        $invitacion->update(['usado' => true]);

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registro completado con éxito',
            'token'   => $token,
            'user'    => $usuario
        ]);
    }
}