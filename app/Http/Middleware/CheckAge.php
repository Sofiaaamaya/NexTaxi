<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
class CheckAge
{
/**
* Manejar una solicitud entrante.
*/
public function handle(Request $request, Closure $next)
{
if ($request->age < 18) {
return response()->json(["message" => "Acceso denegado.

Debes ser mayor de edad."], 403);
}
return $next($request);
}
}