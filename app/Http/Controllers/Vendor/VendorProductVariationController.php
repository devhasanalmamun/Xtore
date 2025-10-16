<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class VendorProductVariationController extends Controller
{
    public function create(): Response
    {
      return Inertia::render('vendor/product/product-variation/vendor-product-variation-create');
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
