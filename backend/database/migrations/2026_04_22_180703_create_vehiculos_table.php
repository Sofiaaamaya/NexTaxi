<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id('id_vehiculo');
            $table->string('matricula', 20)->unique();
            $table->string('marca', 50)->nullable();
            $table->string('modelo', 50)->nullable();
            $table->integer('plazas')->default(4);
            $table->string('color', 30)->nullable();
            $table->enum('tipo', ['normal','adaptado','premium'])->default('normal');
            $table->integer('anio')->nullable();

            $table->foreignId('id_cooperativa')
                ->nullable()
                ->constrained('cooperativas', 'id_cooperativa')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('vehiculos');
    }
};