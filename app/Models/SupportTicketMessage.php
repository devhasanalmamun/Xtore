<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportTicketMessage extends Model
{
    protected $fillable = [
        'support_ticket_id',
        'sender_id',
        'message',
        'attachments',
    ];

    public function casts(): array
    {
        return [
            'attachments' => 'array',
        ];
    }
}
