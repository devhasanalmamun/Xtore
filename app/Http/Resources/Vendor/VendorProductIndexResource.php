<?php

declare(strict_types=1);

namespace App\Http\Resources\Vendor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorProductIndexResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'thumbnail_image' => $this->thumbnail_image,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
