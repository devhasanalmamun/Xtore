<?php

declare(strict_types=1);

use App\Http\Controllers\{
    DetermineDashboardController,
    EditorMediaController,
    FileUploadController,
    HomeController,
    Landing\LandingCategoryController,
    Landing\LandingContactPageController,
    Landing\LandingFlashSaleController
};
use App\Http\Controllers\Landing\LandingAboutUsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/flash-sales', LandingFlashSaleController::class)->name('flash-sales.index');
Route::resource('/categories', LandingCategoryController::class)->only('index', 'show');
Route::get('/contact-us', LandingContactPageController::class)->name('contact-us.index');
Route::get('/about-us', LandingAboutUsController::class)->name('about-us.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('determine-dashboard', DetermineDashboardController::class)->name('determine-dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/editor-media', EditorMediaController::class)->name('editor-media.store');
    Route::post('/upload/product-image', FileUploadController::class)->name('upload.product-image');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin-dashboard.php';
require __DIR__.'/vendor-dashboard.php';
require __DIR__.'/customer-dashboard.php';
