<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    protected $table = 'vehiculos';
    protected $primaryKey = 'id_vehiculo';

    protected $fillable = [
        'marca',
        'modelo',
        'matricula',
        'color'
    ];

    public function conductor()
    {
        return $this->hasOne(Conductor::class, 'id_vehiculo', 'id_vehiculo');
    }
}
