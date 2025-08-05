<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Container\Attributes\Authenticated;
use App\Http\Controllers\Controller;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

class VendorDashboardController extends Controller
{
    public function __invoke(#[Authenticated] User $user): Response
    {
        return Inertia::render('vendor/vendor-dashboard');
    }
}
