<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ConductorController;


Route::get('/conductores', [ConductorController::class, 'index']);
