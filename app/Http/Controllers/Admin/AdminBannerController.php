<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\DataTransferObjects\AdminBannerData;
use App\Enums\{BannerPlacementPagesEnum, BannerPlacementSectionsEnum};
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminBannerResource;
use App\Models\{Banner, User};
use Illuminate\Container\Attributes\Authenticated;
use Illuminate\Http\{RedirectResponse, Request};
use Inertia\{Inertia, Response};

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
        return Inertia::render('admin/banner/admin-banner-create', [
            'pages' => BannerPlacementPagesEnum::labels(),
            'sections' => BannerPlacementSectionsEnum::labels(),
        ]);
    }

    public function store(#[Authenticated] User $user, AdminBannerData $data): RedirectResponse
    {
        Banner::create([
            ...$data->toArray(),
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        return redirect(route('admin.banners.index'));
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

    public function destroy(Banner $banner): RedirectResponse
    {
        $banner->delete();

        return redirect(route('admin.banners.index'));
    }
}
