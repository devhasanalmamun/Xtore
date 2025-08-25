<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'parent_id',
        'name',
        'slug',
        'meta_title',
        'meta_description',
        'active'
    ];

    public function casts(): array 
    {
        return [
            'active'=> 'boolean'
        ];
    }

    public function getRouteKeyName() : string
    {
        return 'slug';
    }

    public function department() : BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
