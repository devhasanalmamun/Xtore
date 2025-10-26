<?php

declare(strict_types=1);

namespace App\Http\Resources\Vendor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class VendorProductEditResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'description_html' => Str::markdown($this->description),
            'price' => $this->price,
            'quantity' => $this->quantity,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'status' => $this->status,
            'department_id' => $this->department->id,
            'category_id' => $this->category->id,
            'thumbnail_image' => $this->thumbnail_image,
            'product_images' => $this->product_images,
        ];
    }
}
