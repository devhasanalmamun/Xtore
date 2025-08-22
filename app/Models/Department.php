<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'meta_title',
        'meta_description',
        'active'
    ];

    protected function casts(): array 
    {
        return [
            'active'=> 'boolean',
        ];
    }

    protected function slug() : Attribute 
    {
        return Attribute::make(
            set: fn ($value) => Str::slug($value ?: $this->name, '-')
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
