<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Container\Attributes\Authenticated;
use App\Http\Controllers\Controller;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

class CustomerDashboardController extends Controller
{
    public function __invoke(#[Authenticated] User $user): Response
    {
        return Inertia::render('customer/customer-dashboard');
    }
}
