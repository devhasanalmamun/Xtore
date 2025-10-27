<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\{BannerPlacementPagesEnum, BannerPlacementSectionsEnum};
use App\Models\{Banner, Category};
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('landings/homepage/homepage-index', [
            'banner_hero_images' => Banner::where([
                ['active', true],
                ['page', BannerPlacementPagesEnum::HOMEPAGE->value],
                ['section', BannerPlacementSectionsEnum::HERO->value],
            ])->select('title', 'image')->get(),
             'categories' => Category::where('active', true)->select('name', 'slug', 'image')->get(),
        ]);
    }
}
