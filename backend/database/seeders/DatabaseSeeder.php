<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear una cooperativa por defecto
        $cooperativa = \App\Models\Cooperativa::updateOrCreate(
            ['nombre' => 'Cooperativa Central NexTaxi'],
            [
                'direccion' => 'Calle Principal 123',
                'telefono' => '922000000'
            ]
        );

        // Crear un administrador por defecto para pruebas
        Usuario::updateOrCreate(
            ['email' => 'admin@nextaxi.com'],
            [
                'nombre'   => 'Admin NexTaxi',
                'password' => Hash::make('admin123'),
                'rol'      => 'admin',
                'telefono' => '611111111'
            ]
        );

        // Crear un cliente de prueba
        Usuario::updateOrCreate(
            ['email' => 'cliente@test.com'],
            [
                'nombre'   => 'Cliente Prueba',
                'password' => Hash::make('password123'),
                'rol'      => 'cliente',
                'telefono' => '622222222'
            ]
        );

        // Llamar al seeder de conductores
        $this->call(ConductorSeeder::class);
    }
}
