<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
}
