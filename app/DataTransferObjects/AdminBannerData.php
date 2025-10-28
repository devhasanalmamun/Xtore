<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Enums\{BannerPlacementPagesEnum, BannerPlacementSectionsEnum};
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\{Max, Min, Required, Rule as ValidationRuleSpatie};
use Spatie\LaravelData\Data;

final class AdminBannerData extends Data
{
    public function __construct(
        public readonly string $image,

        #[Required, Min(2), Max(255)]
        public readonly string $title,

        public readonly string $slug,

        #[Required]
        public readonly BannerPlacementPagesEnum $page,

        #[Required]
        public readonly BannerPlacementSectionsEnum $section,

        #[Required, ValidationRuleSpatie('boolean')]
        public readonly bool $active,
    ) {}

    public static function rules(): array
    {
        $banner_id = request()->route('banner')?->id;

        return [
            'slug' => ['required', 'max:255', Rule::unique('banners', 'slug')->ignore($banner_id)],
            'image' => ['required', 'string'],
        ];
    }

    public static function messages(): array
    {
        return [
            'image.required' => 'Please upload a banner image.',
        ];
    }
}
