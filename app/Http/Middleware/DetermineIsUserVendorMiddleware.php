<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DetermineIsUserVendorMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && $request->user()->isVendor()) {
            return $next($request);
        }
        abort(Response::HTTP_FORBIDDEN);
    }
}
