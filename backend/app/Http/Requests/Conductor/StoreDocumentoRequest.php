<?php
namespace App\Http\Requests\Conductor;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentoRequest extends FormRequest
{
    public function rules(): array {
        return [
            'archivo' => 'required|file|mimes:pdf,jpg,png|max:2048',
            'tipo' => 'required|in:dni,licencia,seguro,otros'
        ];
    }
}