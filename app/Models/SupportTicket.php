<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SupportTicketStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportTicket extends Model
{
    protected $fillable = [
        'created_by',
        'assigned_to',
        'support_ticket_category_id',
        'description',
        'attachments',
        'status',
    ];

    protected $casts = [
        'status' => SupportTicketStatusEnum::class,
        'attachments' => 'array',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(SupportTicketCategory::class, 'category_id');
    }
}
