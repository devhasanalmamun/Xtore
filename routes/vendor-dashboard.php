<?php

use App\Http\Controllers\Vendor\VendorDashboardController;
use App\Http\Controllers\Vendor\VendorProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'vendor'])
	->name('vendor.')
	->prefix('vendor')
	->group(function () {
    Route::get('dashboard', VendorDashboardController::class)->name('dashboard.index');
		Route::resource('products', VendorProductController::class);
});