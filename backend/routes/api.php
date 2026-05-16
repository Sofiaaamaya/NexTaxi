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

use App\Http\Controllers\GoogleController;

Route::post('/google/route', [GoogleController::class, 'route']);
Route::post('/viajes/{id}/guardar-ruta', [GoogleController::class, 'guardarRuta']);

Route::post('/invitaciones/validar', [App\Http\Controllers\Api\Admin\AdminController::class, 'validarInvitacion']);
Route::post('/invitaciones/completar', [App\Http\Controllers\Api\Admin\AdminController::class, 'completarRegistro']);
Route::post('/contacto', [App\Http\Controllers\Api\ContactoController::class, 'send']);

