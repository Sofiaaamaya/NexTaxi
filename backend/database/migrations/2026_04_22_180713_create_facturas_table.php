<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id('id_factura');

            $table->foreignId('id_viaje')
                ->constrained('viajes', 'id_viaje')
                ->cascadeOnDelete();

            $table->string('ruta_pdf');
            $table->dateTime('fecha');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('facturas');
    }
};