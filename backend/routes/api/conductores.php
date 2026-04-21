<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Conductor\ConductorController;

Route::prefix('conductores')->middleware('auth:sanctum')->group(function () {

    Route::get('/', [ConductorController::class, 'index']);

    Route::middleware('isAdmin')->group(function () {
        Route::patch('/{id}/validar', [ConductorController::class, 'validar']);
    });

    Route::middleware('isConductor')->group(function () {
        Route::get('/perfil', [ConductorController::class, 'perfil']);
    });

});