<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Resources\Vendor\VendorSupportTicketResource;
use App\Models\SupportTicket;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VendorSupportTicketController extends Controller
{
    public function index()
    {
        $supportTickets = SupportTicket::query()
            ->with(['category:id,name'])
            ->where('created_by', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('vendor/support-ticket/vendor-support-ticket-index', [
            'support_tickets' => VendorSupportTicketResource::collection($supportTickets),
        ]);
    }
}
