<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('conductores', function (Blueprint $table) {
            $table->id('id_conductor');

            $table->foreignId('id_usuario')
                ->constrained('usuarios', 'id_usuario')
                ->cascadeOnDelete();

            $table->string('dni', 20)->unique();
            $table->string('numero_licencia', 50)->unique();
            $table->date('licencia_expira')->nullable();
            $table->string('foto_licencia')->nullable();

            $table->foreignId('id_vehiculo')
                ->constrained('vehiculos', 'id_vehiculo');

            $table->enum('estado', ['disponible','ocupado','fuera_servicio'])->default('fuera_servicio');

            $table->enum('estado_verificacion', ['pendiente','aprobado','rechazado'])->default('pendiente');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('conductores');
    }
};