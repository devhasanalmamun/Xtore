<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminCategoryResource;
use App\DataTransferObjects\AdminCategoryData;
use App\Models\{Category, Department};
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Inertia\{Inertia, Response};

class AdminCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::with('department')->orderBy('name')->paginate(10);

        return Inertia::render('admin/category/admin-category-index', [
            'categories' => AdminCategoryResource::collection($categories),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/category/admin-category-create', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'department_id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(AdminCategoryData $data): RedirectResponse
    {
        Category::create($data->toArray());
        return redirect(route('admin.categories.index'));
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('admin/category/admin-category-edit', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'department_id', 'name')->orderBy('name')->get(),
            'category' => $category,
        ]);
    }

    public function update(AdminCategoryData $data, Category $category): RedirectResponse
    {
        $category->update($data->toArray());
        return redirect(route('admin.categories.index'));
    }

    public function destroy(Category $category)
    {
        $category->children()->update([
            'parent_id' => $category->parent_id,
        ]);

        $category->delete();

        return back();
    }
}
