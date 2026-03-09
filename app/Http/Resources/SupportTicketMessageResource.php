<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupportTicketMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sender' => $this->whenLoaded('sender', [
                'id' => $this->sender->id,
                'name' => $this->sender->isAdmin() ? 'Admin Support' : $this->sender->first_name.' '.$this->sender->last_name,
                'role' => $this->sender->role->value,
                'isAdmin' => $this->sender->isAdmin(),
                'image' => $this->sender->image,
            ]),
            'message' => $this->message,
            'attachments' => $this->attachments,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
