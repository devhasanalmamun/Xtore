<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Enums\SupportTicketVisibilityEnum;
use Spatie\LaravelData\Attributes\Validation\{BooleanType, IntegerType, Max, Min, Required};
use Spatie\LaravelData\Data;

final class AdminSupportTicketCategoryData extends Data
{
    public function __construct(
        #[Required, Min(3), Max(255)]
        public readonly string $name,

        #[Required]
        public readonly SupportTicketVisibilityEnum $visibility,

        #[Required, IntegerType]
        public readonly int $sort_order,

        #[Required, BooleanType]
        public readonly bool $active,
    ) {}
}
