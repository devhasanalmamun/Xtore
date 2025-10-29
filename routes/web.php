<?php

declare(strict_types=1);

  use App\Http\Controllers\{DetermineDashboardController,
    EditorMediaController,
    FileUploadController,
    HomeController,
    Landing\LandingCategoryController};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::resource('/categories', LandingCategoryController::class);

Route::get('/contact-us', function () {
    return Inertia::render('landings/contact-us/contact-us-index');
})->name('contact-us.index');

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
