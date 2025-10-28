<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminBannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AdminBannerController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('admin/banner/admin-banner-index', [
          'banners' => AdminBannerResource::collection(Banner::orderBy('created_at')->paginate(10)),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
