<?php

declare(strict_types=1);

namespace App\Http\Controllers\Vendor;

use App\Enums\ProductVariationTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\VariationType;
use Illuminate\Http\Request;
use Inertia\{Inertia, Response};

class VendorProductVariationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('vendor/product/product-variation/vendor-product-variation-create', [
            'variation_types' => VariationType::where('active', true)->select('id', 'name')->get(),
            'variation_display_types' => ProductVariationTypeEnum::labels(),
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
