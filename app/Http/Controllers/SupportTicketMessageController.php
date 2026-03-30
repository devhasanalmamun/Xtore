<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Events\SupportTicketMessageCreated;
use App\Models\{SupportTicket, SupportTicketMessage};
use Illuminate\Http\{RedirectResponse, Request};
use Illuminate\Support\Facades\Auth;

class SupportTicketMessageController extends Controller
{
    public function store(Request $request, SupportTicket $ticket): RedirectResponse
    {
        $data = $request->validate([
            'message' => 'required | string',
        ]);

        $message = SupportTicketMessage::create([
            ...$data,
            'sender_id' => Auth::user()->id,
            'support_ticket_id' => $ticket->id,
        ]);

        broadcast(new SupportTicketMessageCreated($message))->toOthers();

        return back();
    }
}
