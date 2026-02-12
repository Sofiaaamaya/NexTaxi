<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['nullable', 'string', 'max:20'],
            'rol' => ['required', 'string', 'in:cliente,conductor'],
            // Conditional validation for conductors
            'numero_licencia' => ['required_if:rol,conductor', 'nullable', 'string', 'max:50', 'unique:conductores,numero_licencia'],
            'matricula' => ['required_if:rol,conductor', 'nullable', 'string', 'max:20', 'unique:vehiculos,matricula'],
            'marca' => ['required_if:rol,conductor', 'nullable', 'string', 'max:50'],
            'modelo' => ['required_if:rol,conductor', 'nullable', 'string', 'max:50'],
            'plazas' => ['required_if:rol,conductor', 'nullable', 'integer', 'min:1'],
        ]);

        try {
            \Illuminate\Support\Facades\DB::beginTransaction();

            // 1. Create default User (for Auth)
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // 2. Create Usuario (for Application Logic)
            $usuario = \App\Models\Usuario::create([
                'nombre' => $request->name,
                'email' => $request->email,
                'contraseña' => Hash::make($request->password),
                'telefono' => $request->phone,
                'rol' => $request->rol,
                'idioma' => 'es',
                'activo' => true,
            ]);

            // 3. If Conductor, create Vehicle and Conductor profile
            if ($request->rol === 'conductor') {
                $vehiculo = \App\Models\Vehiculo::create([
                    'matricula' => $request->matricula,
                    'marca' => $request->marca,
                    'modelo' => $request->modelo,
                    'plazas' => $request->plazas ?? 4,
                ]);

                \App\Models\Conductor::create([
                    'id_usuario' => $usuario->id_usuario,
                    'id_vehiculo' => $vehiculo->id_vehiculo,
                    'numero_licencia' => $request->numero_licencia,
                    'estado' => 'disponible', // Default to available? Or 'fuera_servicio'?
                ]);
            }

            \Illuminate\Support\Facades\DB::commit();

            event(new Registered($user));

            Auth::login($user);

            return redirect(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\DB::rollBack();
            return back()->withInput()->withErrors(['email' => 'Error al registrar el usuario: ' . $e->getMessage()]);
        }
    }
}