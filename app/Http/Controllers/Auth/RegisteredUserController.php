<?php

namespace App\Http\Controllers\Auth;

use App\DataTransferObjects\RegisteredUserData;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    
    public function store(RegisteredUserData $data): RedirectResponse
    {
		$user = User::create($data->toArray());

        event(new Registered($user));
        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
