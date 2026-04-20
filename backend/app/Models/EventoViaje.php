<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventoViaje extends Model
{
    protected $table = 'eventos_viaje';
    protected $primaryKey = 'id_evento';

    protected $fillable = [
        'id_viaje',
        'tipo_evento',
        'id_usuario',
        'datos_extra',
        'fecha_evento'
    ];

    protected $casts = [
        'datos_extra' => 'array'
    ];

    public function viaje()
    {
        return $this->belongsTo(Viaje::class, 'id_viaje');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
