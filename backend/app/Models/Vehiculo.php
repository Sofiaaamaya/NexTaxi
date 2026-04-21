<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    protected $primaryKey = 'id_vehiculo';

    protected $fillable = [
        'matricula','marca','modelo','plazas','color','tipo','anio','id_cooperativa'
    ];

    public function conductor() {
        return $this->hasOne(Conductor::class, 'id_vehiculo');
    }
}