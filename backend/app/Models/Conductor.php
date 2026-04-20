<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conductor extends Model
{
    protected $table = 'conductores';
    protected $primaryKey = 'id_conductor';

    protected $fillable = [
        'id_usuario',
        'dni',
        'numero_licencia',
        'licencia_expira',
        'foto_licencia',
        'id_vehiculo',
        'estado'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }

    public function ubicaciones()
    {
        return $this->hasMany(UbicacionConductor::class, 'id_conductor');
    }

    public function viajes()
    {
        return $this->hasMany(Viaje::class, 'id_conductor');
    }

    public function ofertas()
    {
        return $this->hasMany(OfertaPendiente::class, 'id_conductor');
    }
}
