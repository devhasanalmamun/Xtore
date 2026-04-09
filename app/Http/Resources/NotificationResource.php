<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'created_by' => $this->data['created_by'],
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
