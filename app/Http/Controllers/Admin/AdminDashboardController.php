<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Container\Attributes\Authenticated;
use Inertia\{Inertia, Response};

class AdminDashboardController extends Controller
{
    public function __invoke(#[Authenticated] User $user): Response
    {
        return Inertia::render('admin/dashboard/admin-dashboard');
    }
}
