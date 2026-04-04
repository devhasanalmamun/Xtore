<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        return NotificationResource::collection(Auth::user()->notifications()->latest()->get());
    }

    public function update(string $notification)
    {
        Auth::user()->notifications()->findOrFail($notification)->markAsRead();

        return response()->json([], 204);
    }
}
