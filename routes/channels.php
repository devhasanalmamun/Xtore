<?php

declare(strict_types=1);

use App\Models\SupportTicket;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Broadcast::channel('support.ticket.{ticket}', function (User $user, SupportTicket $ticket) {
//     return $user->isAdmin() || (int) $user->id === (int) $ticket->created_by;
// });
