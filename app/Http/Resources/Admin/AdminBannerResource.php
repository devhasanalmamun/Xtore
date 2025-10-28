<?php

declare(strict_types=1);

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminBannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'image' => $this->image,
            'title' => $this->title,
            'slug' => $this->slug,
            'page' => $this->page->label(),
            'section' => $this->section->label(),
            'active' => $this->active,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
