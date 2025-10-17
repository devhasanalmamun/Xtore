<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileMover {
	public static function moveFile(string $old_url, string $new_folder_destination) : string
	{
    $old_base_path = str_replace(config('filesystems.disks.s3.url'), '', $old_url);
    $new_full_path = $new_folder_destination . basename($old_base_path);

    Storage::move($old_base_path, $new_full_path);

		return config('filesystems.disks.s3.url') . $new_full_path;
	}

	public static function moveFiles(array $images_urls, string $new_folder_destination): array
  {
			$new_images = [];
			foreach ($images_urls as $image_url) {
        $old_base_path = str_replace(config('filesystems.disks.s3.url'), '', $image_url);
        $new_full_path = $new_folder_destination . basename($old_base_path);

        Storage::move($old_base_path, $new_full_path);

        $new_images[] = config('filesystems.disks.s3.url') . $new_full_path;
			}

			return $new_images;
	}

  public static function removeFile ($old_url): void
  {
    $old_path = str_replace(config('filesystems.disks.s3.url'), '', $old_url);
    Storage::delete($old_path);
  }
}
