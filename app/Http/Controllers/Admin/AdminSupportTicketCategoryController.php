<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminSupportTicketCategoryData;
use App\Enums\SupportTicketVisibilityEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminSupportCategoryResource;
use App\Models\SupportTicketCategory;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminSupportTicketCategoryController extends Controller
{
    public function index()
    {
        $categories = SupportTicketCategory::orderBy('sort_order', 'asc')->paginate(10);

        return Inertia::render('admin/support-ticket/support-ticket-category-index', [
            'categories' => AdminSupportCategoryResource::collection($categories),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/support-ticket/support-ticket-category-create', [
            'visibility_options' => SupportTicketVisibilityEnum::values(),
        ]);
    }

    public function store(AdminSupportTicketCategoryData $data)
    {
        $transformedData = $data->toArray();

        SupportTicketCategory::create([
            ...$transformedData,
            'slug' => Str::slug($transformedData['name']),
        ]);

        return redirect()->route('admin.support-ticket-categories.index');
    }

    public function edit(SupportTicketCategory $support_ticket_category)
    {
        return Inertia::render('admin/support-ticket/support-ticket-category-edit', [
            'category' => AdminSupportCategoryResource::make($support_ticket_category),
            'visibility_options' => SupportTicketVisibilityEnum::values(),
        ]);
    }
}
