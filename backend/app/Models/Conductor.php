<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conductor extends Model
{
    protected $table = 'conductores';
    protected $primaryKey = 'id_conductor';
    public $timestamps = true;

    protected $fillable = [
        'id_usuario',
        'numero_licencia',
        'id_vehiculo',
        'estado'
    ];
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo', 'id_vehiculo');
    }

}
