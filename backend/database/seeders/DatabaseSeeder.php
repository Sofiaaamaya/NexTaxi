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
        // Crear un administrador por defecto para pruebas
        Usuario::create([
            'nombre'   => 'Admin NexTaxi',
            'email'    => 'admin@nextaxi.com',
            'password' => Hash::make('admin123'),
            'rol'      => 'admin',
        ]);

        // Crear un cliente de prueba
        Usuario::create([
            'nombre'   => 'Cliente Prueba',
            'email'    => 'cliente@test.com',
            'password' => Hash::make('password123'),
            'rol'      => 'cliente',
        ]);
    }
}
