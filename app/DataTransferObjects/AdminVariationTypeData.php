<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\{Max, Min, Required, Rule as ValidationRuleSpatie};
use Spatie\LaravelData\Data;

final class AdminVariationTypeData extends Data
{
    public function __construct(
        #[Required, Min(3), Max(255)]
        public readonly string $name,

        public readonly string $slug,

        #[Required, ValidationRuleSpatie('boolean')]
        public readonly bool $active,
    ) {}

    public static function rules(): array
    {
        $variation_type_id = request()->route('variation_type')?->id;

        return [
            'slug' => ['required', 'max:255', Rule::unique('variation_types', 'slug')->ignore($variation_type_id)],
        ];
    }
}
