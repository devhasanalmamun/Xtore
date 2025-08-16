<?php

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Data;
use App\Models\Department;

final class AdminDepartmentData extends Data{
  public function __construct(
    #[Required, Min(3), Max(255)]
    public readonly string $name,

    #[Required, Max(255), Unique(Department::class, 'slug')]
    public readonly string $slug,

    #[Required, Max(255)]
    public readonly string $meta_title,

    #[Required, Max(1024)]
    public readonly string $meta_description,

    #[Required, Rule('boolean')]
    public readonly bool $active,
  ){}
}