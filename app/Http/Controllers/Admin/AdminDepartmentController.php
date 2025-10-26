<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminDepartmentData;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminDepartmentResource;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Inertia\{Inertia, Response};

class AdminDepartmentController extends Controller
{
    public function index(): Response
    {
        $departments = Department::select('id', 'name', 'slug', 'meta_title', 'meta_description', 'active', 'created_at')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('admin/department/admin-department-index', [
            'departments' => AdminDepartmentResource::collection($departments),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/department/admin-department-create');
    }

    public function store(AdminDepartmentData $data): RedirectResponse
    {
        Department::create($data->toArray());

        return redirect(route('admin.departments.index'));
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('admin/department/admin-department-edit', [
            'department' => $department,
        ]);
    }

    public function update(Department $department, AdminDepartmentData $data): RedirectResponse
    {
        $department->update($data->toArray());

        return redirect(route('admin.departments.index'));
    }

    public function destroy(Department $department): RedirectResponse
    {
        $department->delete();

        return back();
    }
}
