<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id_usuario';

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'telefono',
        'rol'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    public function conductor() {
        return $this->hasOne(Conductor::class, 'id_usuario');
    }

    public function solicitudes() {
        return $this->hasMany(SolicitudTaxi::class, 'id_cliente');
    }
}