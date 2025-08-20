<?php

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminDepartmentData;
use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

class AdminDepartmentController extends Controller
{
    public function index() : Response
	{
		return Inertia::render('admin/department/admin-department-index', [
			'departments'=> Department::all()
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
}
