<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('landings/category/category-index', [
          'categories' => Category::where('active', true)->select('id', 'parent_id', 'name', 'image', 'slug')->get(),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Category $category): Response
    {
        $category_ids = $category->allCategoryIds();
        $products = Product::WhereIn('category_id', $category_ids)->select('id', 'title', 'slug', 'price', 'quantity', 'thumbnail_image')->get();

        return Inertia::render('landings/category/category-show', [
          'products' => $products,
          'categories' => Category::where('active', true)->select('id', 'parent_id', 'name', 'image', 'slug')->get(),
        ]);
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
