<?php

namespace App\Http\Resources\Vendor;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class VendorProductIndexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title'=> $this->title,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'thumbnail_image' => [
                'secure_url' => $this->thumbnail_image,
                'public_id' => $this->thumbnail_public_id
            ],
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
