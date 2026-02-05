<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\{BannerPlacementPagesEnum, BannerPlacementSectionsEnum, ProductStatusEnum, UserRoleEnum};
use App\Http\Resources\Landing\LandingProductResource;
use App\Models\{Banner, Category, Product, User};
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $flash_sale = Product::where('discount_percentage', '>', 0)
            ->where('status', ProductStatusEnum::PUBLISHED)
            ->limit(16)
            ->get();

        return Inertia::render('landings/homepage/homepage-index', [
            'banner_hero_images' => Banner::where([
                ['active', true],
                ['page', BannerPlacementPagesEnum::HOMEPAGE->value],
                ['section', BannerPlacementSectionsEnum::HERO->value],
            ])->select('title', 'image')->get(),
            'flash_sales' => LandingProductResource::collection($flash_sale),
            'categories' => Category::where('active', true)->select('name', 'slug', 'image')->take(16)->get(),
            'vendors' => User::where('role', UserRoleEnum::VENDOR->value)->get(),
        ]);
    }
}
