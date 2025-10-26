<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Container\Attributes\Authenticated;
use Inertia\{Inertia, Response};

class CustomerDashboardController extends Controller
{
    public function __invoke(#[Authenticated] User $user): Response
    {
        return Inertia::render('customer/customer-dashboard');
    }
}
