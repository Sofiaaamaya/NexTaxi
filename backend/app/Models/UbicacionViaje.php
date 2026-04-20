<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UbicacionViaje extends Model
{
    protected $table = 'ubicaciones_viaje';
    protected $primaryKey = 'id_ubicacion';

    public $timestamps = false;

    protected $fillable = [
        'id_viaje',
        'latitud',
        'longitud',
        'fecha_registro'
    ];

    public function viaje()
    {
        return $this->belongsTo(Viaje::class, 'id_viaje');
    }
}
