<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Closure;

class DetermineIsUserAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check() && $request->user()->isAdmin()){
            return $next($request);
        }
        abort(Response::HTTP_FORBIDDEN);
    }
}
