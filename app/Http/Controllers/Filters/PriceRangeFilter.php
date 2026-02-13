<?php

declare(strict_types=1);

namespace App\Http\Controllers\Filters;

use Closure;

final class PriceRangeFilter
{
    public function handle(array $payload, Closure $next): array
    {
        $payload['query'] = $payload['query']->whereBetween('price', [
            $payload['filters']->minPrice ?? 0,
            $payload['filters']->maxPrice,
        ]);

        return $next($payload);
    }
}
