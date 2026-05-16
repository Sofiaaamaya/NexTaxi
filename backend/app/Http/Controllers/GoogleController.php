<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Services\RouteService;
use App\Models\Viaje;

class GoogleController extends Controller
{
    public function route(Request $request)
    {
        $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
        ]);

        $apiKey = env('GOOGLE_MAPS_API_KEY');
        $origin = $request->input('origin');
        $destination = $request->input('destination');

        $response = Http::get('https://maps.googleapis.com/maps/api/directions/json', [
            'origin' => $origin,
            'destination' => $destination,
            'key' => $apiKey,
        ]);

        if (!$response->ok()) {
            return response()->json(['error' => 'Google Directions API error'], 500);
        }

        return response()->json($response->json());
    }

    public function guardarRuta(Request $request, $id)
    {
        $request->validate([
            'route' => 'required|array',
        ]);

        $viaje = Viaje::findOrFail($id);

        $routeData = $request->input('route');
        $service = new RouteService();
        $parsed = $service->parseRoute($routeData);

        $viaje->distancia = $parsed['distancia'];
        $viaje->duracion = $parsed['duracion'];
        $viaje->polyline = $parsed['polyline'];
        $viaje->pasos = $parsed['pasos'];
        $viaje->coordenadas = $parsed['coordenadas'];
        $viaje->save();

        return response()->json(['message' => 'Ruta guardada correctamente', 'viaje' => $viaje]);
    }
}
