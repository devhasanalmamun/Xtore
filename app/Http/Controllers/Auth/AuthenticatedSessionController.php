<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
