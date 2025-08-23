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

    // public function paginationInformation($request, $paginated, $default)
    // {
    //     dd($request);
    //     $default['links']['custom'] = 'https://example.com';
    //     return $default;
    // }

    // public function paginationInformation($request, $paginated, $default)
    // {
    //     return [
    //         'meta' => [
    //         'total' => $paginated->total(),
    //         'per_page' => $paginated->perPage(),
    //         'current_page' => $paginated->currentPage(),
    //         'last_page' => $paginated->lastPage(),
    //         'next_page_url' => $paginated->nextPageUrl(),
    //         'prev_page_url' => $paginated->previousPageUrl(),
    //         'links' => $paginated->linkCollection(),
    //         ],
    //     ];
    // }
}
