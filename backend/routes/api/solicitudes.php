<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Solicitud\SolicitudTaxiController;

Route::prefix('solicitudes')->group(function () {

    // 🌐 Guest
    Route::post('/', [SolicitudTaxiController::class, 'store']);

    // 🔐 Auth
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [SolicitudTaxiController::class, 'index']);
    });

});