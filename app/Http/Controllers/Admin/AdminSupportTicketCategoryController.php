<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminSupportTicketCategoryData;
use App\Enums\SupportTicketVisibilityEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminSupportCategoryResource;
use App\Models\SupportTicketCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\{Inertia, Response};

class AdminSupportTicketCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = SupportTicketCategory::orderBy('sort_order', 'asc')->paginate(10);

        return Inertia::render('admin/support-ticket/support-ticket-category-index', [
            'categories' => AdminSupportCategoryResource::collection($categories),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/support-ticket/support-ticket-category-create', [
            'visibility_options' => SupportTicketVisibilityEnum::values(),
        ]);
    }

    public function store(AdminSupportTicketCategoryData $data): RedirectResponse
    {
        $transformedData = $data->toArray();

        SupportTicketCategory::create([
            ...$transformedData,
            'slug' => Str::slug($transformedData['name']),
        ]);

        return redirect()->route('admin.support-ticket-categories.index');
    }

    public function edit(SupportTicketCategory $support_ticket_category): Response
    {
        return Inertia::render('admin/support-ticket/support-ticket-category-edit', [
            'category' => AdminSupportCategoryResource::make($support_ticket_category),
            'visibility_options' => SupportTicketVisibilityEnum::values(),
        ]);
    }

    public function update(AdminSupportTicketCategoryData $data, SupportTicketCategory $support_ticket_category): RedirectResponse
    {
        $transformedData = $data->toArray();

        $support_ticket_category->update([
            ...$transformedData,
            'slug' => Str::slug($transformedData['name']),
        ]);

        return redirect()->route('admin.support-ticket-categories.index');
    }

    public function destroy(SupportTicketCategory $support_ticket_category): RedirectResponse
    {
        $support_ticket_category->delete();

        return redirect()->route('admin.support-ticket-categories.index');
    }
}
