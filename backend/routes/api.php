<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\ConductorController;
use App\Http\Controllers\Api\VehiculoController;
use App\Http\Controllers\Api\CooperativaController;
use App\Http\Controllers\Api\SolicitudTaxiController;
use App\Http\Controllers\Api\OfertaPendienteController;
use App\Http\Controllers\Api\ViajeController;
use App\Http\Controllers\Api\EventoViajeController;
use App\Http\Controllers\Api\UbicacionConductorController;
use App\Http\Controllers\Api\UbicacionViajeController;
use App\Http\Controllers\Api\ChatbotController;

/*
|--------------------------------------------------------------------------
| Rutas públicas (sin autenticación)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Rutas privadas (requieren token Sanctum)
|--------------------------------------------------------------------------
*/
/*
Route::middleware('auth:sanctum')->group(function () {

    // Usuario autenticado
    Route::get('/user', [AuthController::class, 'user']);

    // CRUDs
    Route::apiResource('usuarios', UsuarioController::class);
 
    Route::apiResource('conductores', ConductorController::class);
    Route::apiResource('vehiculos', VehiculoController::class);
    Route::apiResource('cooperativas', CooperativaController::class);

    Route::apiResource('solicitudes', SolicitudTaxiController::class);
    Route::apiResource('ofertas', OfertaPendienteController::class);
    Route::apiResource('viajes', ViajeController::class);

    Route::apiResource('eventos', EventoViajeController::class);

    Route::apiResource('ubicaciones-conductor', UbicacionConductorController::class);
    Route::apiResource('ubicaciones-viaje', UbicacionViajeController::class);

    // Chatbot
    Route::post('chatbot', [ChatbotController::class, 'ask']);
});*/