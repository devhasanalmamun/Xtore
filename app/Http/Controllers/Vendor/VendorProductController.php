<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Resources\Vendor\VendorProductResource;
use Illuminate\Container\Attributes\Authenticated;
use App\DataTransferObjects\VendorProductData;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\UploadedFile;
use App\Enums\ProductStatusEnum;
use App\Models\Department;
use App\Models\Category;
use App\Models\Product;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index(#[Authenticated] User $user): Response
    {
        $products = Product::select('title','slug', 'description', 'price', 'quantity', 'thumbnail_url', 'thumbnail_public_id', 'status', 'created_at')
            ->where('created_by', $user->id)
            ->orderBy('title')
            ->paginate(10);

        return Inertia::render('vendor/product/vendor-product-index', [
            'products' => VendorProductResource::collection($products)
        ]);
    }

    public function create(): Response 
    {
        return Inertia::render('vendor/product/vendor-product-create', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'department_id', 'name')->orderBy('name')->get(),
            'status' => ProductStatusEnum::labels(),
        ]);
    }

    public function store(#[Authenticated] User $user, VendorProductData $data): RedirectResponse 
    {
        //TODO: Will add a queue/jobs to upload images in the future
        $folder_thumbnail_path = "Xtore/products/{$data->slug}/thumbnail";

        $thumbnail_public_id = Storage::disk(env('FILESYSTEM_DISK'))->put($folder_thumbnail_path, $data->thumbnail_url);
        $thumbnail_url = Storage::disk(env('FILESYSTEM_DISK'))->url($thumbnail_public_id);

        Product::create([
            ...$data->toArray(),
            'thumbnail_url' => $thumbnail_url,
            'thumbnail_public_id' => $thumbnail_public_id,
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        return redirect(route('vendor.products.store'));
    }

    public function edit(Product $product): Response 
    {
        return Inertia::render('vendor/product/vendor-product-edit', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'department_id', 'name')->orderBy('name')->get(),
            'status' => ProductStatusEnum::labels(),
            'product'=> $product
        ]);    
    }

    public function update(VendorProductData $data, Product $product): RedirectResponse 
    {
        $folder_thumbnail_path = "Xtore/products/{$data->slug}/thumbnail";

        if($data->thumbnail_url instanceof UploadedFile){
            if($product->thumbnail_public_id){
                Storage::disk(env('FILESYSTEM_DISK'))->delete($product->thumbnail_public_id);
            }
        }

        $thumbnail_public_id = Storage::disk(env('FILESYSTEM_DISK'))->put($folder_thumbnail_path, $data->thumbnail_url);
        $thumbnail_url = Storage::disk(env('FILESYSTEM_DISK'))->url($thumbnail_public_id);

        
        $product->update([
            ...$data->toArray(),
            'thumbnail_url' => $thumbnail_url,
            'thumbnail_public_id' => $thumbnail_public_id,
        ]);
        return redirect(route('vendor.products.index'));
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return redirect(route('vendor.products.index'));
    }
}
