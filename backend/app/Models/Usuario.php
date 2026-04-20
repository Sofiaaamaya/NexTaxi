<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'telefono',
        'rol'
    ];

    protected $hidden = ['password'];

    public function conductor()
    {
        return $this->hasOne(Conductor::class, 'id_usuario');
    }

    public function solicitudes()
    {
        return $this->hasMany(SolicitudTaxi::class, 'id_cliente');
    }

    public function eventos()
    {
        return $this->hasMany(EventoViaje::class, 'id_usuario');
    }
}
