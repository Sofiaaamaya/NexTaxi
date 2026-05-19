<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsConductor
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->rol === 'conductor') {
            return $next($request);
        }

        return response()->json(['error' => 'No tienes permisos de conductor.'], 403);
    }
}
