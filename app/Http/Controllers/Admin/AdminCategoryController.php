<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminCategoryResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

class AdminCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::with('department')->orderBy('name')->paginate(10);

        return Inertia::render('admin/category/admin-category-index', [
            'categories' => AdminCategoryResource::collection($categories),
        ]);
    }

    
    public function create() : Response
    {
        return Inertia::render('admin/category/admin-category-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(Category $category) : RedirectResponse
    {
        $category->delete();
        return back();
    }
}
