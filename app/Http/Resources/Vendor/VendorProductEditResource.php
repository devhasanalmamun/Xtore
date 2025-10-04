<?php

namespace App\Http\Resources\Vendor;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VendorProductEditResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title'=> $this->title,
            'slug' => $this->slug,
            'description'=> $this->description,
            'description_html' => Str::markdown($this->description),
            'price' => $this->price,
            'quantity' => $this->quantity,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'status' => $this->status,
            'department_id' => $this->department->id,
            'category_id' => $this->category->id,
            'thumbnail_image' => [
                'secure_url' => $this->thumbnail_image,
                'public_id' => $this->thumbnail_public_id
            ],
            'product_images' => collect($this->product_images)->map(function($url, $index){
                return [
                    'secure_url' => $url,
                    'public_id' => $this->product_image_public_ids[$index] ?? null
                ];
            }),
        ];
    }
}
