<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Resources\Vendor\VendorProductIndexResource;
use App\Http\Resources\Vendor\VendorProductEditResource;
use Illuminate\Container\Attributes\Authenticated;
use App\DataTransferObjects\VendorProductData;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\UploadedFile;
use App\Enums\ProductStatusEnum;
use App\Helpers\FileMover;
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
        $products = Product::select('title','slug', 'price', 'quantity', 'thumbnail_image', 'thumbnail_public_id', 'status', 'created_at')
            ->where('created_by', $user->id)
            ->orderBy('title')
            ->paginate(10);

        return Inertia::render('vendor/product/vendor-product-index', [
            'products' => VendorProductIndexResource::collection($products)
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
        // Move thumbnail to proper folder
        $thumbnail_result = FileMover::moveFile($data->thumbnail_image['public_id'], "Xtore/products/{$data->slug}/thumbnail");

        // Product images
        $folder_images_path = "Xtore/products/{$data->slug}/images";
        $product_image_secure_urls = [];
        $product_image_public_ids = [];

        foreach ($data->product_images as $image) {
            $product_image_secure_urls[] = $image['secure_url'];
            $product_image_public_ids[] = $image['public_id'];
        }


        Product::create([
            ...$data->toArray(),
            'thumbnail_image' => $thumbnail_result['secure_url'],
            'thumbnail_public_id' => $thumbnail_result['public_id'],
            'product_images' => $product_image_secure_urls,
            'product_image_public_ids' => $product_image_public_ids,
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
            'product'=> VendorProductEditResource::make($product)
        ]);
    }

    public function update(VendorProductData $data, Product $product): RedirectResponse 
    {
        $folder_thumbnail_path = "Xtore/products/{$data->slug}/thumbnail";

        if($data->thumbnail_image instanceof UploadedFile){
            if($product->thumbnail_public_id){
                Storage::disk(env('FILESYSTEM_DISK'))->delete($product->thumbnail_public_id);
            }
        }

        $thumbnail_public_id = Storage::disk(env('FILESYSTEM_DISK'))->put($folder_thumbnail_path, $data->thumbnail_image);
        $thumbnail_url = Storage::disk(env('FILESYSTEM_DISK'))->url($thumbnail_public_id);

        
        $product->update([
            ...$data->toArray(),
            'thumbnail_image' => $thumbnail_url,
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
