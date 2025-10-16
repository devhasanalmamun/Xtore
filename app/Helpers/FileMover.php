<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileMover {
	public static function moveFile(string $old_path, string $new_path) : string
	{
    $old_base_path = str_replace(config('filesystems.disks.s3.url'), '', $old_path);
    $new_full_path = $new_path . basename($old_base_path);

    Storage::move($new_full_path, $old_base_path);

		return config('filesystems.disks.s3.url') . $new_full_path;
	}

	public static function moveFiles(array $product_images, string $new_path): array
  {
			$new_product_images = [];

			foreach ($product_images as $image) {
        $old_base_path = str_replace(config('filesystems.disks.s3.url'), '', $image);
        $new_full_path = $new_path . basename($old_base_path);

        Storage::move($new_full_path, $old_base_path);

        $new_product_images[] = config('filesystems.disks.s3.url') . $new_full_path;
			}

			return $new_product_images;
	}
}
