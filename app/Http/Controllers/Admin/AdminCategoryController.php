<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminCategoryResource;
use App\DataTransferObjects\AdminCategoryData;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Category;
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
            'departments' => Department::select('id','name')->orderBy('name')->get(),
            'categories' => Category::select('id','department_id', 'name')->orderBy('name')->get()
        ]);
    }

    public function store(AdminCategoryData $data) : RedirectResponse
    {
        Category::create($data->toArray());
        return redirect(route('admin.categories.index'));
    }

    public function edit() : Response
    {
        return Inertia::render('admin/category/admin-category-edit');
    }

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
