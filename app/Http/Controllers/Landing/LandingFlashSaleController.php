<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class LandingFlashSaleController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('landings/flash-sales/flash-sales-index', [
            'products' => Product::get(),
            'categories' => Category::select('id', 'name', 'slug')->withCount('products')->get(),
        ]);
    }
}
