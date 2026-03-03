<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SupportTicketCategoryVisibilityEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicketCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'visibility',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'visibility' => SupportTicketCategoryVisibilityEnum::class,
        'active' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
