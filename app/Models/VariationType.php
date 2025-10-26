<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VariationType extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'type',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    protected function slug(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Str::slug($value ?: $this->name)
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
