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
            'rol'   => 'required|in:conductor,administrador,supervisor'
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
            'msg' => 'Invitación enviada correctamente',
            'invitacion' => $invitacion
        ]);
    }
}