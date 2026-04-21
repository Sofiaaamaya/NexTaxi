<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conductor;
use Illuminate\Http\Request;

class ConductorController extends Controller
{
    public function index()
    {
        return Conductor::all();
    }

    public function show($id)
    {
        return Conductor::with(['usuario', 'vehiculo'])->findOrFail($id);
    }

}
