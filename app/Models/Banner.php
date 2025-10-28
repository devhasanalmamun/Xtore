<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\BannerPlacementSectionsEnum;
use App\Enums\BannerPlacementPagesEnum;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'page',
        'section',
        'image',
        'active',
        'created_by',
        'updated_by',
    ];

    public function casts(): array
    {
        return [
            'page' => BannerPlacementPagesEnum::class,
            'section' => BannerPlacementSectionsEnum::class,
            'active' => 'boolean',
        ];
    }

    public function getRouteKeyName() : string
    {
      return 'slug';
    }
}
