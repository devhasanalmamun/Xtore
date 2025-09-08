<?php

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\Sometimes;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Image;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Max;
use Illuminate\Http\UploadedFile;
use App\Enums\ProductStatusEnum;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

final class VendorProductData extends Data {
  public function __construct(
    #[Required, Min(3)]
    public readonly string $title,

    public readonly string $slug,

    #[Required, Min(3)]
    public readonly string $description,

    #[Required, Min(0)]
    public readonly int $quantity,

    #[Required, Min(1)]
    public readonly int $price,

    #[Required]
    public readonly int $department_id,

    #[Required]
    public readonly int $category_id,

    #[Required, Min(8)]
    public readonly string $meta_title,

    #[Required, Min(8)]
    public readonly string $meta_description,

    #[Required]
    public readonly ProductStatusEnum $status,

    #[Required, Image, Max(2048)]
    // TODO: validate image properly for update, create and when other fields changes (when image field is string) 
    public readonly UploadedFile|string $thumbnail_url,
  )
  {}

  public static function rules(): array
  {
    $product_id = request()->route('product')?->id;

    return [
      'slug' => ['required', 'min:3', 'max:255', Rule::unique('products', 'slug')->ignore($product_id)]
    ];
  }
}
