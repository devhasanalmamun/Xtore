<?php

use App\Http\Controllers\Admin\AdminDepartmentController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Middleware\DetermineIsUserAdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', DetermineIsUserAdminMiddleware::class])
    ->name('admin.')
		->prefix('admin')
		->group(function() {
			Route::get('dashboard', AdminDashboardController::class)->name('dashboard.index');
			Route::resource('departments', AdminDepartmentController::class);
	});