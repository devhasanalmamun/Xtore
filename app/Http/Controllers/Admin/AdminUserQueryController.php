<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminUserQueryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/user-query/user-query-index');
    }
}
