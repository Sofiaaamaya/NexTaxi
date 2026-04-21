<?php

namespace App\Models;

class Usuario extends Model
{
    protected $primaryKey = 'id_usuario';

    protected $fillable = [
        'nombre','email','password','telefono','rol'
    ];

    protected $hidden = ['password'];

    public function conductor() {
        return $this->hasOne(Conductor::class, 'id_usuario');
    }

    public function solicitudes() {
        return $this->hasMany(SolicitudTaxi::class, 'id_cliente');
    }
}