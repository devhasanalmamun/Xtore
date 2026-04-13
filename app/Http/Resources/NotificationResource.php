<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->data['title'],
            'url' => $this->data['url'],
            'is_read' => $this->read_at !== null,
            'image' => $this->data['image'],
            'type' => Str::of($this->type)->afterLast('\\')->snake()->replace('_notification', ''),
            'created_by' => $this->data['created_by'],
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
