<?php

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\Rule as ValidationRuleSpatie;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

final class AdminCategoryData extends Data{
  public function __construct(
    public readonly ?int $parent_id,

    #[Required]
    public readonly int $department_id,

    #[Required, Min(2), Max(255)]
    public readonly string $name,

    public readonly string $slug,

    #[Required, Min(8), Max(255)]
    public readonly string $meta_title,

    #[Required, Min(8), Max(1024)]
    public readonly string $meta_description,

    #[Required, ValidationRuleSpatie('boolean')]
    public readonly bool $active,
  )
  {}

  public static function rules(): array
  {
    $category_id = request()->route('category')?->id;
    
    return [
      'slug' => ['required', 'max:255', Rule::unique('categories', 'slug')->ignore($category_id)]
    ];
  }
}