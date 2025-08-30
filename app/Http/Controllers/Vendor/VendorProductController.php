<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Container\Attributes\Authenticated;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Inertia\Response;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index(#[Authenticated] User $user): Response
    {
        return Inertia::render('vendor/product/vendor-product-index', [
            'products' => Product::where('created_by', $user->id)->orderBy('title')->get()
        ]);
    }

    public function create(): Response 
    {
        return Inertia::render('vendor/product/vendor-product-create');
    }
}
