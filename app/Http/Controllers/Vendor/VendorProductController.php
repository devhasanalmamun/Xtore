<?php

declare(strict_types=1);

namespace App\Http\Controllers\Vendor;

use App\DataTransferObjects\VendorProductData;
use App\Enums\ProductStatusEnum;
use App\Helpers\FileMover;
use App\Http\Controllers\Controller;
use App\Http\Resources\Vendor\{VendorProductEditResource, VendorProductIndexResource};
use App\Models\{Category, Department, Product, User};
use Illuminate\Container\Attributes\Authenticated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\{Inertia, Response};

class VendorProductController extends Controller
{
    public function index(#[Authenticated] User $user): Response
    {
        $products = Product::select('title', 'slug', 'price', 'quantity', 'thumbnail_image', 'status', 'created_at')
            ->where('created_by', $user->id)
            ->orderBy('title')
            ->paginate(10);

        return Inertia::render('vendor/product/vendor-product-index', [
            'products' => VendorProductIndexResource::collection($products),
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
            'product_images' => null,
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        $updated_thumbnail_url = FileMover::moveFile($data->thumbnail_image, "/products/$product->id/thumbnail/");
        $updated_product_images_urls = FileMover::moveFiles($data->product_images, "/products/$product->id/images/");

        $product->update([
            ...$data->toArray(),
            'thumbnail_image' => $updated_thumbnail_url,
            'product_images' => $updated_product_images_urls,
        ]);

        return redirect(route('vendor.products.store'));
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('vendor/product/vendor-product-edit', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'department_id', 'name')->orderBy('name')->get(),
            'status' => ProductStatusEnum::labels(),
            'product' => VendorProductEditResource::make($product),
        ]);
    }

    public function update(VendorProductData $data, Product $product): RedirectResponse
    {
        if ($data->thumbnail_image !== $product->thumbnail_image) {
            if ($product->thumbnail_image) {
                FileMover::removeFile($product->thumbnail_image);
            }
        }

        $deleted_images = array_diff($product->product_images ?? [], $data->product_images);
        foreach ($deleted_images as $image) {
            FileMover::removeFile($image);
        }

        $product->update([
            ...$data->toArray(),
            'thumbnail_image' => $data->thumbnail_image,
            'product_images' => $data->product_images,
        ]);

        return redirect(route('vendor.products.index'));
    }

    public function destroy(Product $product): RedirectResponse
    {
        $folder_path = "products/$product->id";
        Storage::deleteDirectory($folder_path);
        $product->delete();

        return redirect(route('vendor.products.index'));
    }
}
