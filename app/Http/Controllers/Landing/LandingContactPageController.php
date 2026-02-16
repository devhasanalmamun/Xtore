<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\Enums\SupportTicketVisibilityEnum;
use App\Http\Controllers\Controller;
use App\Models\SupportTicketCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LandingContactPageController extends Controller
{
    public function __invoke()
    {
        $support_ticket_categories = SupportTicketCategory::select('id', 'name');

        if (! Auth::check()) {
            $support_ticket_categories->where('visibility', SupportTicketVisibilityEnum::BOTH->value);
        }

        if (Auth::check() && Auth::user()->isUser()) {
            $support_ticket_categories->where('visibility', SupportTicketVisibilityEnum::CUSTOMER->value);
        }

        if (Auth::check() && Auth::user()->isVendor()) {
            $support_ticket_categories->where('visibility', SupportTicketVisibilityEnum::VENDOR->value);
        }

        return Inertia::render('landings/contact-us/contact-us-index', [
            'support_ticket_categories' => $support_ticket_categories->get(),
        ]);
    }
}
