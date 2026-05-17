<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Solicitud\SolicitudTaxiController;

Route::prefix('solicitudes')->group(function () {

    // 🔐 Auth
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [SolicitudTaxiController::class, 'store']);
        Route::get('/', [SolicitudTaxiController::class, 'index']);
        Route::get('/pendientes', [SolicitudTaxiController::class, 'pendientes']);
        Route::post('/{id}/cancelar', [SolicitudTaxiController::class, 'cancelar']);
    });

});