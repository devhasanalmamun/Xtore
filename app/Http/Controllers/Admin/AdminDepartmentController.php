<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminDepartmentController extends Controller
{
    public function index() {
		return Inertia::render('admin/department/admin-department-index');
	}
}
