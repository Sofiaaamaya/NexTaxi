<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitacion extends Model
{
    protected $table = 'invitaciones';

    protected $fillable = [
        'email',
        'token',
        'rol',
        'expiracion',
        'usado'
    ];

    protected $casts = [
        'expiracion' => 'datetime',
        'usado' => 'boolean'
    ];
}
