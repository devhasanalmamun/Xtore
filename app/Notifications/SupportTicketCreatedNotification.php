<?php

namespace App\Notifications;

use App\Models\SupportTicket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SupportTicketCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public int $tries = 5;
    public int $timeout = 120;

    public function __construct(public readonly SupportTicket $ticket) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function viaQueues(): array 
    {
        return [
            'mail' => 'mail-queue',
            'database' => 'database-queue',
        ];
    }

    public function toMail(object $notifiable): MailMessage
    {
        // Load Category and Created By
        
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        $ticket = $this->ticket->loadMissing(['category:id,name', 'createdBy:id,first_name,last_name']);
        
        return [
            'ticket_id' => $ticket->id,
            'type' => 'support_ticket_created',
            'category' => $ticket->category->name,
            'subject' => $ticket->subject,
            'created_by' => $ticket->createdBy->first_name.' '.$ticket->createdBy->last_name,
            'message' => "New support ticket #{$ticket->id} created by {$ticket->createdBy->first_name} {$ticket->createdBy->last_name}",
        ];
    }
}
