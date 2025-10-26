<?php

declare(strict_types=1);

use Cloudinary\Api\Admin\AdminApi;
use Illuminate\Support\Facades\{Artisan, Schedule};

Artisan::command('cloudinary:cleanup-temp', function () {
    $folder = 'Xtore/temp';

    try {
        $result = new AdminApi()->deleteAssetsByPrefix("$folder/");
        info("✅ Cloudinary $folder/ cleanup successful", ['result' => $result]);
    } catch (Exception $e) {
        info("❌ Cloudinary $folder/ folder cleanup failed: {$e->getMessage()}");
    }
})->purpose('Delete all files inside temp folder on cloudinary');

Schedule::command('cloudinary:cleanup-temp')->dailyAt('2:00')->sendOutputTo(storage_path('logs/cloudinary.log'));
