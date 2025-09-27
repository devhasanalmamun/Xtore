<?php

use App\Http\Controllers\DetermineDashboardController;
use App\Http\Controllers\FileUploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landings/homepage/homepage-index');
})->name('home');

Route::get('/contact-us', function () {
    return Inertia::render('landings/contact-us/contact-us-index');
})->name('contact-us.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('determine-dashboard', DetermineDashboardController::class)->name('determine-dashboard');
});

Route::middleware(['auth'])->group(function (){
    Route::post('/upload/product-thumbnail', [FileUploadController::class, 'uploadProductThumbnail'])->name('upload.product-thumbnail');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin-dashboard.php';
require __DIR__.'/vendor-dashboard.php';
require __DIR__.'/customer-dashboard.php';
