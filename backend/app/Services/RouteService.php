<?php

namespace App\Services;

class RouteService
{
    public function parseRoute($routeData)
    {
        $route = $routeData['routes'][0] ?? null;
        if (!$route) {
            throw new \Exception('No se encontró la ruta');
        }

        $leg = $route['legs'][0];
        $distancia = $leg['distance']['value'];
        $duracion = $leg['duration']['value'];
        $polyline = $route['overview_polyline']['points'];
        $pasos = $leg['steps'];
        $coordenadas = $this->decodePolyline($polyline);

        return [
            'distancia' => $distancia,
            'duracion' => $duracion,
            'polyline' => $polyline,
            'pasos' => $pasos,
            'coordenadas' => $coordenadas,
        ];
    }

    // Decodifica polyline de Google a array de coordenadas
    public function decodePolyline($encoded)
    {
        $points = [];
        $index = $lat = $lng = 0;
        $len = strlen($encoded);

        while ($index < $len) {
            $b = $shift = $result = 0;
            do {
                $b = ord($encoded[$index++]) - 63;
                $result |= ($b & 0x1f) << $shift;
                $shift += 5;
            } while ($b >= 0x20);
            $dlat = (($result & 1) ? ~($result >> 1) : ($result >> 1));
            $lat += $dlat;

            $shift = $result = 0;
            do {
                $b = ord($encoded[$index++]) - 63;
                $result |= ($b & 0x1f) << $shift;
                $shift += 5;
            } while ($b >= 0x20);
            $dlng = (($result & 1) ? ~($result >> 1) : ($result >> 1));
            $lng += $dlng;

            $points[] = [
                'lat' => $lat * 1e-5,
                'lng' => $lng * 1e-5,
            ];
        }
        return $points;
    }
}
