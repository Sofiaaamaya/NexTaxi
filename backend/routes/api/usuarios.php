<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Usuario\UsuarioController;

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/usuarios', [UsuarioController::class, 'index']);
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);

});