<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\{Max, Min};
use Spatie\LaravelData\Data;

final class LandingFiltersData extends Data
{
    private const MIN_PRICE = 0;
    private const MAX_PRICE = 100000;

    public function __construct(
        #[Min(self::MIN_PRICE)]
        public readonly int $minPrice = self::MIN_PRICE,

        #[Max(self::MAX_PRICE)]
        public readonly int $maxPrice = self::MAX_PRICE,

        public readonly array $categories = [],
    ) {}

    public static function fromRequest(): self
    {
        return new self(
            minPrice: (int) request('minPrice', self::MIN_PRICE),
            maxPrice: (int) request('maxPrice', self::MAX_PRICE),
            categories: collect(explode(',', request('categories', '')))
                ->filter()
                ->map(fn ($id) => (int) $id)
                ->values()
                ->all(),
        );
    }

    public static function rules(): array
    {
        return [
            'categories.*' => ['integer', 'exists:categories,id'],
            'maxPrice' => ['gte:minPrice'],
        ];
    }
}
