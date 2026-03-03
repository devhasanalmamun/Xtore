<?php

namespace App\Models;

use App\Enums\SupportTicketStatusEnum;
use Illuminate\Database\Eloquent\Model;

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

    public function casts(): array 
    {
        return [
            'status' => SupportTicketStatusEnum::class,
            'attachments' => 'array'
        ];
    }
}
