<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cooperativa extends Model
{
    protected $table = 'cooperativas';
    protected $primaryKey = 'id_cooperativa';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono'
    ];

    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class, 'id_cooperativa');
    }
}
