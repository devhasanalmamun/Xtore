<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminSupportTicketCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/support-ticket/support-ticket-category-index');
    }
}
