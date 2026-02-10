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
        Schema::create('solicitudes_taxi', function (Blueprint $table) {
            $table->id('id_solicitud');
            $table->foreignId('id_cliente')
                ->constrained('usuarios', 'id_usuario')
                ->cascadeOnDelete();
            $table->decimal('recogida_lat', 10, 8);
            $table->decimal('recogida_lng', 11, 8);
            $table->string('recogida_direccion');
            $table->decimal('destino_lat', 10, 8)->nullable();
            $table->decimal('destino_lng', 11, 8)->nullable();
            $table->string('destino_direccion')->nullable();
            $table->enum('estado', ['pendiente', 'asignada', 'cancelada', 'expirada'])
                ->default('pendiente');
            $table->dateTime('fecha_solicitud');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_taxi');
    }
};
