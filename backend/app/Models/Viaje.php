<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    protected $table = 'viajes';
    protected $primaryKey = 'id_viaje';

    protected $fillable = [
        'id_solicitud','id_conductor','estado',
        'inicio_viaje','fin_viaje',
        'precio_estimado','precio_final'
    ];

    public function solicitud() {
        return $this->belongsTo(SolicitudTaxi::class, 'id_solicitud');
    }

    public function conductor() {
        return $this->belongsTo(Conductor::class, 'id_conductor');
    }

    public function eventos() {
        return $this->hasMany(EventoViaje::class, 'id_viaje');
    }
}