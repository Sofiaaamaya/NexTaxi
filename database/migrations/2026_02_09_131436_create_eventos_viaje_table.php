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
        Schema::create('eventos_viaje', function (Blueprint $table) {
            $table->id('id_evento');
            $table->foreignId('id_viaje')
                ->constrained('viajes', 'id_viaje')
                ->cascadeOnDelete();
            $table->enum('tipo_evento', [
                'asignado',
                'conductor_en_camino',
                'recogido',
                'completado',
                'cancelado'
            ]);
            $table->foreignId('id_usuario')
                ->nullable()
                ->constrained('usuarios', 'id_usuario')
                ->nullOnDelete();
            $table->json('datos_extra')->nullable();
            $table->dateTime('fecha_evento');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos_viaje');
    }
};
