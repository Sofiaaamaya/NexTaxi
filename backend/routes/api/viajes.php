<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Viaje\ViajeController;

Route::prefix('viajes')->middleware('auth:sanctum')->group(function () {

    Route::middleware('isConductor')->group(function () {
        Route::post('/{id}/aceptar', [ViajeController::class, 'aceptar']);
        Route::patch('/{id}', [ViajeController::class, 'actualizarEstado']);
    });

    Route::get('/', [ViajeController::class, 'index']);

});