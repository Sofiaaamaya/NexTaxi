<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Viaje\ViajeController;

Route::prefix('viajes')->middleware('auth:sanctum')->group(function () {

    Route::middleware('isConductor')->group(function () {
        Route::post('/{id}/aceptar', [ViajeController::class, 'aceptar']);
        Route::post('/{id}/recoger', [ViajeController::class, 'recoger']);
        Route::post('/{id}/completar', [ViajeController::class, 'completar']);
        Route::patch('/{id}', [ViajeController::class, 'actualizarEstado']);
        
        // Rutas de ubicación
        Route::post('/{id}/ubicaciones', [App\Http\Controllers\Api\Viaje\UbicacionViajeController::class, 'store']);
    });

    Route::get('/', [ViajeController::class, 'index']);
    Route::get('/activa', [ViajeController::class, 'activa']);
    Route::get('/{id}', [ViajeController::class, 'show']);
    Route::get('/{id}/ubicaciones', [App\Http\Controllers\Api\Viaje\UbicacionViajeController::class, 'index']);

});