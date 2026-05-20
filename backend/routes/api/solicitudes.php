<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Solicitud\SolicitudTaxiController;

Route::prefix('solicitudes')->group(function () {
    Route::post('/', [SolicitudTaxiController::class, 'store']);
    Route::post('/{id}/cancelar', [SolicitudTaxiController::class, 'cancelar']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [SolicitudTaxiController::class, 'index']);
        Route::get('/pendientes', [SolicitudTaxiController::class, 'pendientes']);
    });

});