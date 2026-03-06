<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminSupportTicketCategoryResource;
use App\Http\Resources\Vendor\VendorSupportTicketResource;
use App\Models\SupportTicket;
use App\Models\SupportTicketCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\{Inertia, Response};

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

    public function show(SupportTicket $supportTicket)
    {
        dd($supportTicket);
    }

    public function create() : Response
    {
        $supportTicketCategories = SupportTicketCategory::whereNot('visibility', 'customer')->get();

        return Inertia::render('vendor/support-ticket/vendor-support-ticket-create', [
            'support_ticket_categories' => AdminSupportTicketCategoryResource::collection($supportTicketCategories),
        ]);
    }
}
