<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $fillable = [
        'nombre',
        'email',
        'contraseña',
        'telefono',
        'rol',
        'idioma',
        'activo'
    ];

    protected $hidden = [
        'contraseña',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function conductor()
    {
        return $this->hasOne(Conductor::class , 'id_usuario');
    }
}