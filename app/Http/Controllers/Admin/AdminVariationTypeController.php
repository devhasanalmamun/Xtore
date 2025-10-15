<?php

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminVariationTypeData;
use App\Http\Resources\Admin\AdminVariationTypeResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Models\VariationType;
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
        return Inertia::render('admin/variations-types/admin-variation-type-create');
    }

    public function store(AdminVariationTypeData $data): RedirectResponse
    {
        VariationType::create($data->toArray());
        return redirect(route('admin.variation-types.index'));
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
