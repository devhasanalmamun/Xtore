<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Enums\SupportTicketVisibilityEnum;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\{BooleanType, IntegerType, Min, Required};
use Spatie\LaravelData\Data;

final class AdminSupportTicketCategoryData extends Data
{
    public function __construct(
        public readonly string $name,

        #[Required]
        public readonly SupportTicketVisibilityEnum $visibility,

        #[Required, IntegerType, Min(0)]
        public readonly int $sort_order,

        #[Required, BooleanType]
        public readonly bool $active,
    ) {}

    public static function rules(): array
    {
        $support_ticket_category_id = request()->route('support_ticket_category')?->id;

        return [
            'name' => ['required', 'min:3', 'max:255', Rule::unique('support_ticket_categories', 'name')->ignore($support_ticket_category_id)],
        ];
    }

    public static function messages(): array
    {
        return [
            'sort_order.min' => 'The sort order must be greater than 0.',
        ];
    }
}
