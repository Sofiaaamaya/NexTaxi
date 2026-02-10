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
        Schema::create('viajes', function (Blueprint $table) {
            $table->id('id_viaje');
            $table->foreignId('id_solicitud')
                ->constrained('solicitudes_taxi', 'id_solicitud')
                ->restrictOnDelete();
            $table->foreignId('id_conductor')
                ->constrained('conductores', 'id_conductor')
                ->restrictOnDelete();
            $table->foreignId('id_asignado_por')
                ->nullable()
                ->constrained('usuarios', 'id_usuario')
                ->nullOnDelete();
            $table->enum('estado', ['asignado', 'en_camino', 'recogido', 'completado', 'cancelado'])
                ->default('asignado');
            $table->dateTime('inicio_viaje')->nullable();
            $table->dateTime('fin_viaje')->nullable();
            $table->decimal('precio_estimado', 8, 2)->nullable();
            $table->decimal('precio_final', 8, 2)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viajes');
    }
};
