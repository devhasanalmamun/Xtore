<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminDepartmentController extends Controller
{
    public function index() : Response
	{
		return Inertia::render('admin/department/admin-department-index');
	}

	public function create() : Response
	{
		return Inertia::render('admin/department/admin-department-create');
	}
}
