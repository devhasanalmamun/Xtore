<?php

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Min;
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

		#[Required]
		public readonly string $thumbnail_image,

		#[Required]
		public readonly array $product_images,
	)
	{}

	public static function rules(): array
	{
		$product_id = request()->route('product')?->id;

		return [
			'slug' => ['required', 'min:3', 'max:255', Rule::unique('products', 'slug')->ignore($product_id)],
			'thumbnail_image' => ['required', 'string'],
			'product_images'   => ['required', 'array', 'max:5'],
		];
	}

	public static function messages(): array
	{
		return [
			'thumbnail_image.required' => 'Please upload a product thumbnail image.',
			'product_images.required' => 'Please upload at least 1 product image.',
      'product_images.max' => 'You can upload a maximum of 5 images.',
		];
	}
}
