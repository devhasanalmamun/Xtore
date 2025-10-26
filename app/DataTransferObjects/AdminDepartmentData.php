<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\{Max, Min, Required, Rule as ValidationRuleSpatie};
use Spatie\LaravelData\Data;

final class AdminDepartmentData extends Data
{
    public function __construct(
        #[Required, Min(3), Max(255)]
        public readonly string $name,

        public readonly string $slug,

        #[Required, Min(32), Max(255)]
        public readonly string $meta_title,

        #[Required, Min(32), Max(1024)]
        public readonly string $meta_description,

        #[Required, ValidationRuleSpatie('boolean')]
        public readonly bool $active,
    ) {}

    public static function rules(): array
    {
        $departmentId = request()->route('department')?->id;

        return [
            'slug' => ['required', 'max:255', Rule::unique('departments', 'slug')->ignore($departmentId)],
        ];
    }
}
