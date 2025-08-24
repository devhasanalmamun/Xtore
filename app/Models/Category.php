<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function getRouteKey() : string
    {
        return 'slug';
    }

    public function department() : BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
