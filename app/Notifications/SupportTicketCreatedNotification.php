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
        $ticket = $this->ticket->loadMissing(['category:id,name', 'createdBy:id,first_name,last_name']);
        
        return (new MailMessage)
            ->subject("New Support Ticket #{$ticket->id}")
            ->line("Subject: {$ticket->subject}")
            ->line("New support ticket #{$ticket->id} created by {$ticket->createdBy->first_name} {$ticket->createdBy->last_name}")
            ->line("Category: {$ticket->category->name}")
            ->line("Description: {$ticket->description}")
            ->action('View Ticket', url(route('admin.support-tickets.show', $ticket->id)))
            ->line('Please respond to the ticket as soon as possible.');
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
