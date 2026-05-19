<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('documentos', function (Blueprint $table) {
            $table->id('id_documento');

            $table->foreignId('id_conductor')
                ->constrained('conductores', 'id_conductor')
                ->cascadeOnDelete();

            $table->enum('tipo', ['dni','licencia','seguro','otros']);
            $table->string('ruta_archivo');

            $table->enum('estado', ['pendiente','aprobado','rechazado'])->default('pendiente');

            $table->dateTime('fecha_subida');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('documentos');
    }
};