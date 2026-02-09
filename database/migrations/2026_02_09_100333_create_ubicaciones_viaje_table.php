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
        Schema::create('ubicaciones_viaje', function (Blueprint $table) {
            $table->id('id_ubicacion');

            $table->foreignId('id_viaje')
                ->constrained('viajes', 'id_viaje')
                ->cascadeOnDelete();
            $table->decimal('latitud', 10, 8);
            $table->decimal('longitud', 11, 8);
            $table->dateTime('fecha_registro');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ubicaciones_viaje');
    }
};
