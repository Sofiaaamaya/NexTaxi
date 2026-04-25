<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && in_array($request->user()->rol, ['administrador', 'supervisor'])) {
            return $next($request);
        }

        return response()->json(['error' => 'No tienes permisos suficientes.'], 403);
    }
}
