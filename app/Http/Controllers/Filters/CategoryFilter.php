<?php

declare(strict_types=1);

namespace App\Http\Controllers\Filters;

use Closure;

final class CategoryFilter
{
    public function handle(array $payload, Closure $next): array
    {
        if (! empty($payload['filters']->categories)) {
            $payload['query'] = $payload['query']->whereIn('category_id', $payload['filters']->categories);
        }

        return $next($payload);
    }
}
