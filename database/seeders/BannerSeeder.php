<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        Banner::factory()->createMany(
            [
                [
                    'title' => 'banner-1',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-1.png',
                    'slug' => 'banner-1',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-2',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-2.png',
                    'slug' => 'banner-2',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-3',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-3.png',
                    'slug' => 'banner-3',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-4',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-4.png',
                    'slug' => 'banner-4',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-5',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-5.png',
                    'slug' => 'banner-5',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-6',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-6.png',
                    'slug' => 'banner-6',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-7',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-7.png',
                    'slug' => 'banner-7',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
                [
                    'title' => 'banner-8',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/banners/banner-8.png',
                    'slug' => 'banner-8',
                    'page' => 'homepage',
                    'section' => 'hero',
                ],
            ]
        );
    }
}
