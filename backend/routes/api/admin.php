<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\AdminController;

Route::prefix('admin')->middleware(['auth:sanctum','isAdmin'])->group(function () {

    Route::get('/usuarios', [AdminController::class, 'usuarios']);
    Route::get('/conductores', [AdminController::class, 'conductores']);

});