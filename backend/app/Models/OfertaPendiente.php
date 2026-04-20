<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfertaPendiente extends Model
{
    protected $table = 'ofertas_pendientes';

    protected $fillable = [
        'id_solicitud',
        'id_conductor',
        'estado',
        'vence_at'
    ];

    public function solicitud()
    {
        return $this->belongsTo(SolicitudTaxi::class, 'id_solicitud');
    }

    public function conductor()
    {
        return $this->belongsTo(Conductor::class, 'id_conductor');
    }
}
