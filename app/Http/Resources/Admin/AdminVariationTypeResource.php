<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class AdminVariationTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
      return [
        'name' => $this->name,
        'slug' => $this->slug,
        'active'=> $this->active,
        'created_at'=> $this->created_at->diffForHumans()
      ];
    }
}
