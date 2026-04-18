<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\{ArrayType, IntegerType, Max, Min, Required};
use Spatie\LaravelData\Optional;
use Spatie\LaravelData\Data;

final class SupportTicketData extends Data
{
    public function __construct(
        #[Required, Min(12), Max(255)]
        public readonly string $subject,

        #[Required, Min(24), Max(1024)]
        public readonly string $description,

        #[Required, IntegerType]
        public readonly int $category,

        #[ArrayType]
        public readonly array|Optional $attachments = [],
    ) {}

}
