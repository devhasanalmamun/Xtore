<?php

declare(strict_types=1);

namespace App\Http\Controllers\Vendor;

use App\DataTransferObjects\SupportTicketData;
use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminSupportTicketCategoryResource;
use App\Http\Resources\SupportTicketMessageResource;
use App\Http\Resources\Vendor\VendorSupportTicketResource;
use App\Models\{SupportTicket, SupportTicketCategory, User};
use App\Notifications\SupportTicketCreatedNotification;
use Illuminate\Http\{RedirectResponse};
use Illuminate\Support\Facades\{Auth, Notification};
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

    public function show(SupportTicket $supportTicket): Response
    {
        $messages = $supportTicket->load('messages')->messages;

        return Inertia::render('vendor/support-ticket/vendor-support-ticket-show', [
            'support_ticket' => new VendorSupportTicketResource($supportTicket->load('category:id,name')),
            'support_ticket_messages' => SupportTicketMessageResource::collection($messages),
        ]);
    }

    public function create(): Response
    {
        $supportTicketCategories = SupportTicketCategory::whereNot('visibility', 'customer')->get();

        return Inertia::render('vendor/support-ticket/vendor-support-ticket-create', [
            'support_ticket_categories' => AdminSupportTicketCategoryResource::collection($supportTicketCategories),
        ]);
    }

    public function store(SupportTicketData $data): RedirectResponse
    {
        $transformedData = $data->toArray();

        $ticket = SupportTicket::create([
            ...$transformedData,
            'category_id' => $transformedData['category'],
            'created_by' => Auth::id(),
        ]);

        $admins = User::where('role', UserRoleEnum::ADMIN)->get();

        if ($admins->isNotEmpty()) {
            Notification::send($admins, new SupportTicketCreatedNotification($ticket));
        }

        return redirect()->route('vendor.support-tickets.index');
    }
}
