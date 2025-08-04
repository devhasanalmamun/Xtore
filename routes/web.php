<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landings/homepage/homepage-index');
})->name('home');

Route::get('/contact-us', function () {
    return Inertia::render('landings/contact-us/contact-us-index');
})->name('contact-us.index');

Route::get('/test', function () {
    return Inertia::render('landings/test/test-index');
})->name('test.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
