<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SupportTicketStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class SupportTicket extends Model
{
    protected $fillable = [
        'created_by',
        'assigned_to',
        'category_id',
        'subject',
        'description',
        'images',
        'status',
    ];

    protected $casts = [
        'status' => SupportTicketStatusEnum::class,
        'images' => 'array',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(SupportTicketCategory::class, 'category_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(SupportTicketMessage::class);
    }
}
