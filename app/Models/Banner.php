<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
      'title',
      'page',
      'section',
      'image',
      'active',
      'created_by',
      'updated_by',
    ];

    public function casts() : array
    {
      return [
        'active' => 'boolean',
      ];
    }
}
