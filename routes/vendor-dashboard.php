<?php

use App\Http\Controllers\Vendor\VendorDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
	->name('vendor.')
	->prefix('vendor')
	->group(function () {
    Route::get('dashboard', VendorDashboardController::class)->name('dashboard');
});