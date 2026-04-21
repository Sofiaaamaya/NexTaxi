<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
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

    public function conductor()
    {
        return $this->hasOne(Conductor::class, 'id_usuario', 'id_usuario');
    }
}
