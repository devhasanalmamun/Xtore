<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\UploadedFile;
use Closure;

class UploadImage implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $max_size = 2048;
        
        if(is_string($value)) return;
        
        if($value instanceof UploadedFile) {
            $validator = Validator::make(
                ['file' => $value],
                ['file' => ['image', 'max:'.$max_size]],
                [
                    'file.image' => "Image here must be a valid image file.",
                    'file.max' => "Image must not be greater than ($max_size) KB"
                ]
            );
            
            if($validator->fails()) {
                $fail($validator->errors()->first('file'));
            }
            
            return;
        }

        $fail("The product image must be a valid image file not greater than ($max_size) KB");
    }
}
