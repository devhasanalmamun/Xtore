<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\SupportTicketStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminSupportTicketResource;
use App\Models\SupportTicket;
use Inertia\Inertia;

class AdminSupportTicketController extends Controller
{
    public function index()
    {
        $supportTickets = SupportTicket::query()
            ->with([
                'createdBy:id,first_name,last_name,role',
                'category:id,name',
            ])
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/support-ticket/ticket/admin-support-ticket-index', [
            'support_tickets' => AdminSupportTicketResource::collection($supportTickets),
            'ticket_status_options' => SupportTicketStatusEnum::values(),
        ]);
    }

    public function show(SupportTicket $supportTicket)
    {
        return Inertia::render('admin/support-ticket/ticket/admin-support-ticket-show', [
            'support_ticket' => new AdminSupportTicketResource($supportTicket),
        ]);
    }
}
