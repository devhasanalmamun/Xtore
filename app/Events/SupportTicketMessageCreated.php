<?php

declare(strict_types=1);

namespace App\Events;

use App\Http\Resources\SupportTicketMessageResource;
use App\Models\SupportTicketMessage;
use Illuminate\Broadcasting\{InteractsWithSockets, PrivateChannel};
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SupportTicketMessageCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public SupportTicketMessage $message) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('support.ticket.'.$this->message->support_ticket_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'support.ticket.message.created';
    }

    public function broadcastWith(): array
    {
        $this->message->loadMissing('sender');

        return SupportTicketMessageResource::make($this->message)->resolve();
    }
}
