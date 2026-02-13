<?php

declare(strict_types=1);

namespace App\Http\Controllers\Filters;

use App\Enums\ProductStatusEnum;
use Closure;

class ExcludeDraftProducts
{
    public function handle(array $payload, Closure $next): array
    {
        $payload['query'] = $payload['query']->where('status', ProductStatusEnum::PUBLISHED);

        return $next($payload);
    }
}
