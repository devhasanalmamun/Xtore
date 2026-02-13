<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\DataTransferObjects\LandingFiltersData;
use App\Enums\ProductStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Filters\{CategoryFilter, ExcludeDraftProducts, HasDiscountFilter, PriceRangeFilter};
use App\Models\{Category, Product};
use Illuminate\Pipeline\Pipeline;
use Inertia\Inertia;

class LandingFlashSaleController extends Controller
{
    public function __invoke()
    {
        $filters = LandingFiltersData::fromRequest();

        $query = Product::query();

        $payload = app(Pipeline::class)
            ->send(['query' => $query, 'filters' => $filters])
            ->through([
                ExcludeDraftProducts::class,
                HasDiscountFilter::class,
                PriceRangeFilter::class,
                CategoryFilter::class,
            ])
            ->thenReturn();

        $products = $payload['query']->get();
        $categories = Category::select('id', 'name', 'slug')->withCount([
            'products as products_count' => function ($query) {
                $query->where('status', ProductStatusEnum::PUBLISHED);
                $query->where('discount_percentage', '>', 0);
            }])->get();

        return Inertia::render('landings/flash-sales/flash-sales-index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }
}
