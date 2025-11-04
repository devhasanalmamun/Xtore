<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'quantity',
        'price',
        'discount_percentage',
        'status',
        'thumbnail_image',
        'product_images',
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
            'status' => ProductStatusEnum::class,
            'price' => 'float',
            'discount_percentage' => 'float',
            'product_images' => 'array',
            'product_image_public_ids' => 'array',
        ];
    }

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Str::slug($value ?: $this->title),
        );
    }

    protected function thumbnailImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ?: asset('assets/images/default-gray-product.jpg')
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
