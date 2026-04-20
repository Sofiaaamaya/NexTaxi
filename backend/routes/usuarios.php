<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('usuarios', UsuarioController::class);
});

?>