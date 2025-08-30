<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ProductStatusEnum;

class Product extends Model
{
    use HasFactory;

    public function casts(): array 
    {
        return [
            'status'=> ProductStatusEnum::class
        ];
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
