<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\SupportTicketMessage;
use Illuminate\Http\{RedirectResponse, Request};
use Illuminate\Support\Facades\Auth;

class SupportTicketMessageController extends Controller
{
    public function store(Request $request, $ticket): RedirectResponse
    {
        $data = $request->validate([
            'message' => 'required | string',
        ]);

        SupportTicketMessage::create([
            ...$data,
            'support_ticket_id' => $ticket,
            'sender_id' => Auth::user()->id,
        ]);

        return back();
    }
}
