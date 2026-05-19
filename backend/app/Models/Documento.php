<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $fillable = [
        'id_conductor','tipo','ruta_archivo','estado','fecha_subida'
    ];

    public function conductor() {
        return $this->belongsTo(Conductor::class, 'id_conductor');
    }
}