<?php
require __DIR__.'/auth.php';
require __DIR__.'/usuarios.php';
require __DIR__.'/conductores.php';
require __DIR__.'/vehiculos.php';
require __DIR__.'/viajes.php';

// PRUEBA DE RUTA
Route::get('/ping', function () {
    return response()->json([
        'message' => 'pong desde Laravel',
        'time' => now()
    ]);
});

?>