<?php

namespace App\Http\Controllers\Vendor;

use App\Enums\ProductStatusEnum;
use App\Http\Resources\Vendor\VendorProductResource;
use Illuminate\Container\Attributes\Authenticated;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Department;
use App\Models\Product;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index(#[Authenticated] User $user): Response
    {
        $products = Product::select('title','slug', 'description', 'price', 'quantity', 'status', 'created_at')
            ->where('created_by', $user->id)
            ->orderBy('title')
            ->get();

        return Inertia::render('vendor/product/vendor-product-index', [
            'products' => VendorProductResource::collection($products)
        ]);
    }

    public function create(): Response 
    {
        return Inertia::render('vendor/product/vendor-product-create', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'department_id', 'name')->orderBy('name')->get(),
            'status' => ProductStatusEnum::labels(),
        ]);
    }
}
