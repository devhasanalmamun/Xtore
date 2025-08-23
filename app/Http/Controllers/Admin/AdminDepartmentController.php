<?php

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminDepartmentData;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminDepartmentResource;
use App\Models\Department;
use Inertia\Response;
use Inertia\Inertia;

class AdminDepartmentController extends Controller
{
  public function index() : Response
	{
		// Bugs In Pagination with Resource
		$departments = AdminDepartmentResource::collection(Department::orderBy('name')->paginate(8));
		return Inertia::render('admin/department/admin-department-index', [
			'departments' => $departments,
		]);
	}

	public function create() : Response
	{
		return Inertia::render('admin/department/admin-department-create');
	}

	public function store(AdminDepartmentData $data) : RedirectResponse
	{
		Department::create($data->toArray());
		return redirect(route('admin.departments.index'));
	}

	public function edit(Department $department) : Response 
	{
		return Inertia::render('admin/department/admin-department-edit', [
			'department' => $department
		]);
	}

	public function update(Department $department, AdminDepartmentData $data) : RedirectResponse
	{
		$department->update($data->toArray());
		return redirect(route('admin.departments.index'));
	}

	public function destroy(Department $department) : RedirectResponse 
	{
		$department->delete();
		return back();
	}
}
