<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class AdminDepartmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'meta_title'=> $this->meta_title,
            'meta_description'=> $this->meta_description,
            'active'=> $this->active,
            'created_at'=> $this->created_at->diffForHumans()
        ];
    }
}
