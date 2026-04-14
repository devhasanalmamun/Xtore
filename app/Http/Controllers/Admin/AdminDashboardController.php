<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Container\Attributes\Authenticated;
use Inertia\{Inertia, Response};

class AdminDashboardController extends Controller
{
    public function __invoke(#[Authenticated] User $user): Response
    {
        // TODO: Status is not implemented yet
        $activeVendors = User::where('role', UserRoleEnum::VENDOR)->count();
        $totalCustomers = User::where('role', UserRoleEnum::CUSTOMER)->count();

        // gain or lost customers and vendors vs last month
        $customersVsLastMonth = User::where('role', UserRoleEnum::CUSTOMER)->where('created_at', '>=', now()->subMonth())->count();
        $vendorsVsLastMonth = User::where('role', UserRoleEnum::VENDOR)->where('created_at', '>=', now()->subMonth())->count();

        // gain or lost percent
        $customersVsLastMonthPercent = ($customersVsLastMonth / $totalCustomers) * 100;
        $vendorsVsLastMonthPercent = ($vendorsVsLastMonth / $activeVendors) * 100;

        return Inertia::render('admin/dashboard/admin-dashboard', [
            'primary_stats' => [
                'revenue' => [
                    'total_revenue' => 25369,
                    'revenue_growth_last_month' => 22.45,
                ],
                'orders' => [
                    'total_orders' => 1221,
                    'orders_growth_last_month' => 10.29,
                ],
                'vendors' => [
                    'active_vendors' => $activeVendors,
                    'vendors_growth_last_month' => $vendorsVsLastMonthPercent,
                ],
                'customers' => [
                    'total_customers' => $totalCustomers,
                    'customers_growth_last_month' => $customersVsLastMonthPercent,
                ],
            ],
        ]);
    }
}
