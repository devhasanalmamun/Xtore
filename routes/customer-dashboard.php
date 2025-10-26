<?php

declare(strict_types=1);

use App\Http\Controllers\Customer\CustomerDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->name('customer.')
    ->prefix('customer')
    ->group(function () {
        Route::get('dashboard', CustomerDashboardController::class)->name('dashboard');
    });
