<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ViajeController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('viajes', ViajeController::class);
});
?>