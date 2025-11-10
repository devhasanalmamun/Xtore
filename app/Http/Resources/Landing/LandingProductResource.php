<?php

namespace App\Http\Resources\Landing;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LandingProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
      return [
        'title' => $this->title,
        'slug' => $this->slug,
        'price' => $this->price,
        'discount_percentage' => $this->discount_percentage,
        'quantity' => $this->quantity,
        'thumbnail_image' => $this->thumbnail_image,
      ];
    }
}
