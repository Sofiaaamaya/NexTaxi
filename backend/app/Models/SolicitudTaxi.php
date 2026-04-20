<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudTaxi extends Model
{
    protected $table = 'solicitudes_taxi';
    protected $primaryKey = 'id_solicitud';

    protected $fillable = [
        'id_cliente',
        'recogida_lat',
        'recogida_lng',
        'recogida_direccion',
        'destino_lat',
        'destino_lng',
        'destino_direccion',
        'estado',
        'fecha_solicitud'
    ];

    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'id_cliente');
    }

    public function ofertas()
    {
        return $this->hasMany(OfertaPendiente::class, 'id_solicitud');
    }

    public function viaje()
    {
        return $this->hasOne(Viaje::class, 'id_solicitud');
    }
}
