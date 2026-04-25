<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ValidarConductorRequest extends FormRequest
{
    public function rules(): array {
        return [
            'estado_verificacion' => 'required|in:aprobado,rechazado'
        ];
    }
}
