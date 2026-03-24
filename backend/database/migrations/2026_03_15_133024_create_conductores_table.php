<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('conductores', function (Blueprint $table) {
            $table->id('id_conductor');
            $table->foreignId('id_usuario')
                ->constrained('usuarios', 'id_usuario')
                ->cascadeOnDelete();
            $table->string('numero_licencia', 50)->unique();
            $table->foreignId('id_vehiculo')
                ->constrained('vehiculos', 'id_vehiculo')
                ->restrictOnDelete();
            $table->enum('estado', ['disponible', 'ocupado', 'fuera_servicio'])
                ->default('fuera_servicio');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conductores');
    }
};
