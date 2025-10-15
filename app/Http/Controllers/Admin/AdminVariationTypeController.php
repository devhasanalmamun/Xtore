<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\AdminVariationTypeResource;
use App\DataTransferObjects\AdminVariationTypeData;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Models\VariationType;
use Inertia\Inertia;
use Inertia\Response;

class AdminVariationTypeController extends Controller
{
    public function index() : Response
    {
        return Inertia::render('admin/variations-types/admin-variation-type-index', [
          'variation_types' => AdminVariationTypeResource::collection(VariationType::orderBy('name')->paginate(10))
        ]);
    }

    public function create() : Response
    {
        return Inertia::render('admin/variations-types/admin-variation-type-create');
    }

    public function store(AdminVariationTypeData $data): RedirectResponse
    {
        VariationType::create($data->toArray());
        return redirect(route('admin.variation-types.index'));
    }

    public function edit(VariationType $variationType) : Response
    {
      return Inertia::render('admin/variations-types/admin-variation-type-edit', [
        'variation_type' => AdminVariationTypeResource::make($variationType)
      ]);
    }

    public function update(AdminVariationTypeData $data,VariationType $variationType): RedirectResponse
    {
        $variationType->update($data->toArray());
        return redirect(route('admin.variation-types.index'));
    }

    public function destroy(VariationType $variationType): RedirectResponse
    {
        $variationType->delete();
        return back();
    }
}
