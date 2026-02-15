<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminSupportCategoryResource;
use App\Models\SupportTicketCategory;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminSupportTicketCategoryController extends Controller
{
    public function index()
    {
        $categories = SupportTicketCategory::orderBy('sort_order', 'asc')->paginate(10);

        return Inertia::render('admin/support-ticket/support-ticket-category-index', [
            'categories' => AdminSupportCategoryResource::collection($categories)
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/support-ticket/support-ticket-category-create');
    }
}
