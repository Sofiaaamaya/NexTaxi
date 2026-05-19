<?php


namespace App\Http\Requests\Solicitud;

use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitudRequest extends FormRequest
{
    public function rules(): array {
        return [
            'recogida_lat' => 'required|numeric',
            'recogida_lng' => 'required|numeric',
            'recogida_direccion' => 'required|string',

            'destino_lat' => 'nullable|numeric',
            'destino_lng' => 'nullable|numeric',
            'destino_direccion' => 'nullable|string',

            'nombre_cliente' => 'nullable|string',
            'telefono_cliente' => 'nullable|string'
        ];
    }
}
