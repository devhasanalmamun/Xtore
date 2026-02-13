<?php

declare(strict_types=1);

namespace App\Http\Controllers\Filters;

use Closure;

final class HasDiscountFilter
{
    public function handle(array $payload, Closure $next): array
    {
        $payload['query'] = $payload['query']->where('discount_percentage', '>', 0);

        return $next($payload);
    }
}
