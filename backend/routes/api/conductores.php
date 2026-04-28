<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Conductor\ConductorController;

Route::prefix('conductores')->middleware('auth:sanctum')->group(function () {

    Route::middleware('isConductor')->group(function () {
        Route::get('/perfil', [ConductorController::class, 'perfil']);
    });

    Route::get('/', [ConductorController::class, 'index']);
    Route::post('/', [ConductorController::class, 'store']);
    Route::get('/{id}', [ConductorController::class, 'show']);
    Route::put('/{id}', [ConductorController::class, 'update']);
    Route::delete('/{id}', [ConductorController::class, 'destroy']);

    Route::middleware('isAdmin')->group(function () {
        Route::patch('/{id}/validar', [ConductorController::class, 'validar']);
    });

});