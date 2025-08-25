<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminCategoryResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Department;
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
        return Inertia::render('admin/category/admin-category-create', [
            'departments' => Department::select('name','slug')->orderBy('name')->get(),
            'categories' => Category::select('id', 'parent_id', 'name','slug')->orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        dd($request->all());
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
