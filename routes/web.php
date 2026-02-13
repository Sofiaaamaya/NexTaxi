<?php

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ConductorController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\ProfileController;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});



Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');

    Route::resource('usuarios', UsuarioController::class);
    Route::resource('conductores', ConductorController::class);
});



/* USUARIOS */
Route::get('/usuario', [UsuarioController::class, 'index'])->name('usuarios.index');

Route::get('/usuario/create', [UsuarioController::class, 'create'])->name('usuarios.create');
Route::post('/usuario/create', [UsuarioController::class, 'create'])->name('usuarios.create');

Route::get('/usuario/show/{id}', [UsuarioController::class, 'show'])->name('usuarios.show');

Route::get('/usuario/edit/{id}', [UsuarioController::class, 'edit'])->name('usuarios.edit');
Route::post('/usuario/edit', [UsuarioController::class, 'edit'])->name('usuarios.edit');

Route::get('/usuario/destroy/{id}', [UsuarioController::class, 'destroy'])->name('usuarios.destroy');
Route::post('/usuario/destroy', [UsuarioController::class, 'destroy'])->name('usuarios.destroy');



/* VEHICULOS */

Route::get('/vehiculo', [VehiculoController::class, 'index'])->name('vehiculos.index');

Route::get('/vehiculo/create', [VehiculoController::class, 'create'])->name('vehiculos.create');
Route::post('/vehiculo/create', [VehiculoController::class, 'create'])->name('vehiculos.create');

Route::get('/vehiculo/show/{id}', [VehiculoController::class, 'show'])->name('vehiculos.show');

Route::get('/vehiculo/edit/{id}', [VehiculoController::class, 'edit'])->name('vehiculos.edit');
Route::post('/vehiculo/edit', [VehiculoController::class, 'edit'])->name('vehiculos.edit');

Route::get('/vehiculo/destroy/{id}', [VehiculoController::class, 'destroy'])->name('vehiculos.destroy');
Route::post('/vehiculo/destroy', [VehiculoController::class, 'destroy'])->name('vehiculos.destroy');




/* CONDUCTORES */

Route::get('/conductor', [ConductorController::class, 'index'])->name('conductores.index');

Route::get('/conductor/create', [ConductorController::class, 'create'])->name('conductores.create');
Route::post('/conductor/create', [ConductorController::class, 'create'])->name('conductores.create');

Route::get('/conductor/show/{id}', [ConductorController::class, 'show'])->name('conductores.show');

Route::get('/conductor/edit/{id}', [ConductorController::class, 'edit'])->name('conductores.edit');
Route::post('/conductor/edit', [ConductorController::class, 'edit'])->name('conductores.edit');

Route::get('/conductor/destroy/{id}', [ConductorController::class, 'destroy'])->name('conductores.destroy');
Route::post('/conductor/destroy', [ConductorController::class, 'destroy'])->name('conductores.destroy');




Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');




Route::get('/admin', function () {
    return view('admin.dashboard');
})->middleware('auth');


require __DIR__ . '/auth.php';