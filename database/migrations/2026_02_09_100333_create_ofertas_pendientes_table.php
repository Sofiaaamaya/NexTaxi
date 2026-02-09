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
        Schema::create('ofertas_pendientes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('id_solicitud')
                ->constrained('solicitudes_taxi', 'id_solicitud')
                ->cascadeOnDelete();
            $table->foreignId('id_conductor')
                ->constrained('conductores', 'id_conductor')
                ->cascadeOnDelete();
            $table->enum('estado', ['enviada', 'vista', 'rechazada'])
                ->default('enviada');
            $table->dateTime('vence_at');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ofertas_pendientes');
    }
};
