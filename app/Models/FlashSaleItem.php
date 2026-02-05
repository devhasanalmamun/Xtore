<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FlashSaleItem extends Model
{
    protected $fillable = [
        'vendor_id',
        'product_variation_id',
        'discount_percentage',
        'active',
    ];

    protected $casts = [
        'discount_percentage' => 'float',
        'active' => 'boolean',
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    // TODO: Add relationship to product variation

    public function calculateFlashSalePrice($price): float
    {
        return max(0, round($price * (1 - $this->discount_percentage / 100), 2));
    }
}
