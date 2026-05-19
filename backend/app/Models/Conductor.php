<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conductor extends Model
{
    protected $table = 'conductores';
    protected $primaryKey = 'id_conductor';

    protected $fillable = [
        'id_usuario','dni','numero_licencia','licencia_expira',
        'foto_licencia','id_vehiculo','estado','estado_verificacion'
    ];

    public function usuario() {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function vehiculo() {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }

    public function documentos() {
        return $this->hasMany(Documento::class, 'id_conductor');
    }

    public function viajes() {
        return $this->hasMany(Viaje::class, 'id_conductor');
    }
}