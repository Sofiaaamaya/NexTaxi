<?php

namespace App\Http\Requests\Viaje;

use Illuminate\Foundation\Http\FormRequest;

class UpdateViajeRequest extends FormRequest
{
    public function rules(): array {
        return [
            'estado' => 'required|in:asignado,en_camino,recogido,completado,cancelado'
        ];
    }
}
