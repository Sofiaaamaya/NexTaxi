<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Models\Vehiculo;
use App\Models\Conductor;

class ConductorSeeder extends Seeder
{
    public function run()
    {
        $cooperativa = \App\Models\Cooperativa::first();
        $id_cooperativa = $cooperativa ? $cooperativa->id_cooperativa : null;

        for ($i = 1; $i <= 15; $i++) {

            // Crear o actualizar usuario
            $usuario = Usuario::updateOrCreate(
                ['email' => "conductor$i@example.com"],
                [
                    'nombre' => "Conductor $i",
                    'password' => Hash::make('password123'),
                    'telefono' => "6000000" . str_pad($i, 2, '0', STR_PAD_LEFT),
                    'rol' => 'conductor'
                ]
            );

            // Crear o actualizar vehículo
            $vehiculo = Vehiculo::updateOrCreate(
                ['matricula' => "ABC" . str_pad($i, 4, '0', STR_PAD_LEFT)],
                [
                    'marca' => 'Toyota',
                    'modelo' => 'Prius',
                    'plazas' => 4,
                    'color' => 'Blanco',
                    'tipo' => 'normal',
                    'anio' => 2020,
                    'id_cooperativa' => $id_cooperativa
                ]
            );

            // Crear o actualizar conductor
            Conductor::updateOrCreate(
                ['id_usuario' => $usuario->id_usuario],
                [
                    'dni' => str_pad($i, 8, '0', STR_PAD_LEFT) . "A",
                    'numero_licencia' => "LIC-" . str_pad($i, 4, '0', STR_PAD_LEFT),
                    'licencia_expira' => now()->addYears(3),
                    'foto_licencia' => "licencias/conductor$i.jpg",
                    'id_vehiculo' => $vehiculo->id_vehiculo,
                    'estado' => 'disponible',
                    'estado_verificacion' => 'aprobado'
                ]
            );
        }
    }
}
