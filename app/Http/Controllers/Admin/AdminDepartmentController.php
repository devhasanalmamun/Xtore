<?php

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminDepartmentData;
use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AdminDepartmentController extends Controller
{
  public function index() : Response
	{
		return Inertia::render('admin/department/admin-department-index', [
			'departments'=> Department::orderBy('name')->get(),
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
