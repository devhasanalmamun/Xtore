<?php

declare(strict_types=1);

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminSupportCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'visibility' => $this->visibility,
            'active' => $this->active,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
