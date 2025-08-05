<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Container\Attributes\Authenticated;
use App\Http\Controllers\Controller;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __invoke(#[Authenticated] User $user): Response
    {
        return Inertia::render('admin/admin-dashboard');
    }
}
