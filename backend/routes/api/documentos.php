<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Conductor\DocumentoController;

Route::prefix('documentos')->middleware('auth:sanctum')->group(function () {

    Route::middleware('isConductor')->group(function () {
        Route::post('/', [DocumentoController::class, 'upload']);
        Route::get('/', [DocumentoController::class, 'index']);
    });

});