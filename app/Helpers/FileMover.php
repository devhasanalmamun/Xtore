<?php

namespace App\Helpers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class FileMover {
	public static function moveFile(string $old_public_id, string $new_destination) : array
	{
		if(config('filesystems.default') === 'cloudinary') {
			$new_public_id = $new_destination . '/' . basename($old_public_id);
			$result = Cloudinary::UploadApi()->rename($old_public_id, $new_public_id);

			return [
				'public_id' => $result['public_id'],
				'secure_url' => $result['secure_url']
			];
		}

		if(config('filesystems.default') !== 'cloudinary') {
			Storage::disk(config('filesystems.default'))->move($old_public_id, $new_destination);

			return [
				'public_id' => $old_public_id,
				'secure_url' => Storage::url($new_destination . '/' . basename('$old_public_id'))
			];
		}

		return [
				'public_id' => null,
				'secure_url' => null
			];
	}

	public static function moveFiles(array $product_images, string $new_destination): array
  {
		if(config('filesystems.default') === 'cloudinary') {
			$product_images_public_ids = [];
			$product_images_secure_urls = [];

			foreach ($product_images as $image) {
				$result = Cloudinary::UploadApi()->rename($image['public_id'], $new_destination . '/' . basename($image['public_id']));
        $product_images_public_ids[] = $result['public_id'];
				$product_images_secure_urls[] = $result['secure_url'];
			}

			return [
				'public_ids' => $product_images_public_ids,
				'secure_urls' => $product_images_secure_urls,
			];
		}

		if(config('filesystems.default') !== 'cloudinary') {
			dd('Will be implemented later');
		}

		return [
			'public_ids' => null,
			'secure_urls' => null
		];
	}

	public static function normalizeCloudinaryPublicId(string $public_id){
		return preg_replace('/\.[^.]+$/', '', $public_id);
	}
}
