<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehiculoController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('vehiculos', VehiculoController::class);
});
?>