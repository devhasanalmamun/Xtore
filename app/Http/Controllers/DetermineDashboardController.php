<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Authenticated;
use Illuminate\Http\RedirectResponse;
use App\Enums\UserRoleEnum;
use App\Models\User;

final readonly class DetermineDashboardController
{
    public function __invoke(#[Authenticated] User $user): RedirectResponse
    {
        $path = match ($user->role) {
            UserRoleEnum::ADMIN => route('admin.dashboard.index'),
            UserRoleEnum::VENDOR => route('vendor.dashboard'),
            UserRoleEnum::CUSTOMER => route('home'),
        };

        return redirect($path);
    }
}
