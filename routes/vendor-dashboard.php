<?php

declare(strict_types=1);

use App\Http\Controllers\Vendor\{VendorDashboardController, VendorProductController, VendorProductVariationController};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'vendor'])
    ->name('vendor.')
    ->prefix('vendor')
    ->group(function () {
        Route::get('dashboard', VendorDashboardController::class)->name('dashboard.index');
        Route::resource('products', VendorProductController::class);
        Route::resource('products/variations', VendorProductVariationController::class);
    });
