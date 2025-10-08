<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Resources\Vendor\VendorProductIndexResource;
use App\Http\Resources\Vendor\VendorProductEditResource;
use Illuminate\Container\Attributes\Authenticated;
use App\DataTransferObjects\VendorProductData;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Enums\ProductStatusEnum;
use App\Helpers\FileDeleter;
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
        $product = Product::create([
            ...$data->toArray(),
            'thumbnail_image' => null,
            'thumbnail_public_id' => null,
            'product_images' => null,
            'product_image_public_ids' => null,
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        $thumbnail_result = FileMover::moveFile($data->thumbnail_image['public_id'], "Xtore/products/{$product->id}/thumbnail");
        $product_images_result = FileMover::moveFiles($data->product_images, "Xtore/products/{$product->id}/images");

        $product->update([
            ...$data->toArray(),
            'thumbnail_image' => $thumbnail_result['secure_url'],
            'thumbnail_public_id' => $thumbnail_result['public_id'],
            'product_images' => $product_images_result['secure_urls'],
            'product_image_public_ids' => $product_images_result['public_ids'],
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
        if($data->thumbnail_image['public_id'] !== $product->thumbnail_public_id) {
            if($product->thumbnail_public_id) {
                FileDeleter::delete($product->thumbnail_public_id);
            }
            $thumbnail_result = FileMover::moveFile($data->thumbnail_image['public_id'], "Xtore/products/{$product->id}/thumbnail");
        }

        $existing_public_ids = $product->product_image_public_ids ?? [];
        $existing_secure_urls = $product->product_images ?? [];

        $new_public_ids = collect($data->product_images)->pluck('public_id')->toArray();
        $new_secure_urls = collect($data->product_images)->pluck('secure_url')->toArray();
        
        $final_public_ids = [];
        $final_secure_urls = [];
        foreach ($new_public_ids as $index => $public_id) {
            if(!in_array($public_id, $existing_public_ids)){
                $moved = FileMover::moveFile($public_id, "Xtore/products/{$product->id}/images");
                $final_public_ids[] = $moved['public_id'];
                $final_secure_urls[] = $moved['secure_url'];
            } else {
                $final_public_ids[] = $public_id;

                $old_index = array_search($public_id, $existing_public_ids);
                $final_secure_urls[] =  $existing_secure_urls[$old_index] ?? $new_secure_urls[$index];
            }
        }

        $deleted_images = array_diff($existing_public_ids, $new_public_ids);

        foreach ($deleted_images as $image) {
            FileDeleter::delete($image);
        }

        $product->update([
            ...$data->toArray(),
            'thumbnail_image' => $thumbnail_result['secure_url'] ?? $product->thumbnail_image,
            'thumbnail_public_id' => $thumbnail_result['public_id'] ?? $product->thumbnail_public_id,
            'product_images' => $final_secure_urls,
            'product_image_public_ids' => $final_public_ids
        ]);
        return redirect(route('vendor.products.index'));
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return redirect(route('vendor.products.index'));
    }
}
