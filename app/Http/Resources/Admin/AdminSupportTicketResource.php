<?php

declare(strict_types=1);

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminSupportTicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_by' => $this->whenLoaded('createdBy', [
                'name' => $this->createdBy->first_name.' '.$this->createdBy->last_name,
                'role' => $this->createdBy->role->value,
            ]),
            'category' => $this->whenLoaded('category', [
                'name' => $this->category->name,
            ]),
            'assigned_to' => null,
            'subject' => $this->subject,
            'description' => $this->description,
            'images' => $this->images,
            'status' => $this->status->value,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
