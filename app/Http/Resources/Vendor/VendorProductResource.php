<?php

namespace App\Http\Resources\Vendor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title'=> $this->title,
            'slug' => $this->slug,
            'description'=> $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'status' => $this->status->label(),
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}
