<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/api/auth.php';
require __DIR__.'/api/usuarios.php';
require __DIR__.'/api/conductores.php';
require __DIR__.'/api/vehiculos.php';
require __DIR__.'/api/solicitudes.php';
require __DIR__.'/api/viajes.php';
require __DIR__.'/api/documentos.php';
require __DIR__.'/api/admin.php';

Route::post('/invitaciones/validar', [App\Http\Controllers\Api\Admin\AdminController::class, 'validarInvitacion']);
Route::post('/invitaciones/completar', [App\Http\Controllers\Api\Admin\AdminController::class, 'completarRegistro']);

