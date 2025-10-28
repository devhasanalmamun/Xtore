<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\{BannerPlacementPagesEnum, BannerPlacementSectionsEnum, UserRoleEnum};
use App\Models\{Banner, Category, User};
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
            'categories' => Category::where('active', true)->select('name', 'slug', 'image')->take(16)->get(),
            'vendors' => User::where('role', UserRoleEnum::VENDOR->value)->get(),
        ]);
    }
}
