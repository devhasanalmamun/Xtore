<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class AdminCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'parent_id'=> $this->parent_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'created_at' => $this->created_at->diffForHumans(),
            'department' => $this->whenLoaded('department', function (){
                return [
                    'name'=> $this->department->name,
                    'slug'=> $this->department->slug,
                ];
            })
        ];
    }
}
