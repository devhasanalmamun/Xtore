<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\{AdminCategoryController, AdminDashboardController, AdminDepartmentController, AdminVariationTypeController};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', AdminDashboardController::class)->name('dashboard.index');
        Route::resource('departments', AdminDepartmentController::class);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('variation-types', AdminVariationTypeController::class);
    });
