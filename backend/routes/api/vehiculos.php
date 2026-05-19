<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Vehiculo\VehiculoController;

Route::middleware(['auth:sanctum','isAdmin'])->group(function () {

    Route::apiResource('vehiculos', VehiculoController::class);

});