<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ConductorController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('conductores', ConductorController::class);
});
?>