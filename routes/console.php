<?php

use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Inspiring;
use Cloudinary\Api\Admin\AdminApi;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('cloudinary:cleanup-temp', function() {
    new AdminApi()->deleteAssetsByPrefix('temp/');
})->purpose('Delete all files inside temp folder on cloudinary');

Schedule::command('inspire')->everyMinute()->sendOutputTo(storage_path('logs/inspire.log'));
Schedule::command('cloudinary:cleanup-temp')->everyMinute()->sendOutputTo(storage_path('logs/cloudinary.log'));