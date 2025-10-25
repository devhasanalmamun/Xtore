<?php

namespace App\Http\Controllers;

use App\Enums\BannerPlacementSectionsEnum;
use App\Enums\BannerPlacementPagesEnum;
use App\Models\Category;
use App\Models\Banner;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function __invoke()
    {
      return Inertia::render('landings/homepage/homepage-index', [
        'banner_hero_images' => Banner::where([
          ['active', true],
          ['page', BannerPlacementPagesEnum::HOMEPAGE->value],
          ['section', BannerPlacementSectionsEnum::HERO->value]
        ])->get(),
        'categories' => Category::where('active', true)->select('name', 'slug')->get(),
      ]);
    }
}
