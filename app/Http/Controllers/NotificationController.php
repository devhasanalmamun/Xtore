<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;


class NotificationController extends Controller
{
    public function index()
    {
        return NotificationResource::collection(Auth::user()->notifications()->latest()->get());
    }

    public function update(DatabaseNotification $notification)
    {
        if($notification->notifiable_id !== Auth::user()->id) {
            return response()->json([], 403);
        }

        $notification->markAsRead();

        return response()->json([], 204);
    }

    public function markAllAsRead() 
    {
        Auth::user()->unreadNotifications->markAsRead();

        return response()->json([], 204);
    }
}
