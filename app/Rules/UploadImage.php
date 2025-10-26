<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class UploadImage implements ValidationRule
{
    public function __construct(
        private int $max_size = 1024
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        if (is_string($value)) {
            return;
        }

        if ($value instanceof UploadedFile) {
            $validator = Validator::make(
                ['file' => $value],
                ['file' => ['image', 'max:'.$this->max_size]],
                [
                    'file.image' => 'Image here must be a valid image file.',
                    'file.max' => "Image must not be greater than ($this->max_size) KB",
                ]
            );

            if ($validator->fails()) {
                $fail($validator->errors()->first('file'));
            }

            return;
        }

        $fail("The product image must be a valid image file not greater than ($this->max_size) KB");
    }
}
