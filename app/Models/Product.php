<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ProductStatusEnum;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'quantity',
        'price',
        'status',
        'thumbnail_url',
        'thumbnail_public_id',
        'product_images',
        'product_image_public_ids',
        'meta_title',
        'meta_description',
        'department_id',
        'category_id',
        'created_by',
        'updated_by',
    ];

    public function casts(): array 
    {
        return [
            'status'=> ProductStatusEnum::class,
            'product_images' => 'array',
            'product_image_public_ids' => 'array',
        ];
    }

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Str::slug( $value ?: $this->title, '-'),
        );
    }

    protected function thumbnailUrl(): Attribute 
    {
        return Attribute::make(
            get: fn($value) => $value ?: asset('assets/images/default-gray-product.jpg')
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function department() : BelongsTo 
    {
        return $this->belongsTo(Department::class);
    }

    public function category() : BelongsTo 
    {
        return $this->belongsTo(Category::class);
    }
}
