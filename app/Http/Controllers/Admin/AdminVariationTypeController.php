<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminVariationTypeResource;
use App\Http\Controllers\Controller;
use App\Models\VariationType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminVariationTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/variations-types/admin-variation-type-index', [
          'variation_types' => AdminVariationTypeResource::collection(VariationType::orderBy('name')->paginate(10))
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

    public function destroy(VariationType $variationType): RedirectResponse
    {
        $variationType->delete();
        return back();
    }
}
