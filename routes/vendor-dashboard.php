<?php

use App\Http\Controllers\Vendor\VendorDashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'vendor'])
	->name('vendor.')
	->prefix('vendor')
	->group(function () {
    Route::get('dashboard', VendorDashboardController::class)->name('dashboard.index');
		Route::get('products', [ProductController::class, 'index'])->name('products.index');
});