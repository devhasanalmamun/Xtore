<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Container\Attributes\Authenticated;
use Illuminate\Http\RedirectResponse;

final readonly class DetermineDashboardController
{
    public function __invoke(#[Authenticated] User $user): RedirectResponse
    {
        $path = match ($user->role) {
            UserRoleEnum::ADMIN => route('admin.dashboard.index'),
            UserRoleEnum::VENDOR => route('vendor.dashboard.index'),
            UserRoleEnum::CUSTOMER => route('home'),
        };

        return redirect($path);
    }
}
