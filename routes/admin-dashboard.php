<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->name('admin.')
		->prefix('admin')
		->group(function() {
			Route::get('dashboard', AdminDashboardController::class)->name('dashboard');
	});