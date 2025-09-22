<?php

namespace App\DataTransferObjects;


use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Min;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
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

		public readonly UploadedFile|string $thumbnail_url,

		public readonly array $product_images,
	)
	{}

	public static function rules(): array
	{
		$product_id = request()->route('product')?->id;

		return [
			'slug' => ['required', 'min:3', 'max:255', Rule::unique('products', 'slug')->ignore($product_id)],
			'thumbnail_url' => [
				'required',
				Rule::when(fn($request) => $request['thumbnail_url'] instanceof UploadedFile, File::image()->max(2048))
			],

			'product_images' => ['required', 'array', 'max:5'],
			'product_images.*' => [ 
				function($attribute, $value, $fail) {
					if($value instanceof UploadedFile) {
						$validator = Validator::make(
							['file' => $value],
							['file' => 'image|max:2048'],
							[
								'file.image' => 'Each file must be a valid image format (jpg, png, etc).',
								'file.max' => 'Each product image must not be greater than 2MB.',
							]
							);

							if($validator->fails()) {
								$fail($validator->errors()->first('file'));
							}

							return;
					}

					if(is_string($value)) return;

					$fail('Each product image must be a valid image format (jpg, png, etc) and not greater than 2MB.');
				}
			]
		];
	}

	public static function messages(): array
	{
		return [
			'thumbnail_url.required' => 'Please upload a product thumbnail image.',
			'thumbnail_url.max' => 'The image must not be greater than 2MB.',
			'thumbnail_url.image' => 'The file must be a valid image format (jpg, png, etc).',

			'product_images.required' => 'Please upload at least 1 product image.',
      'product_images.max' => 'You can upload a maximum of 5 images.',
		];
	}
}
