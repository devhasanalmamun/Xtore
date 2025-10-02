<?php 

namespace App\Helpers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class FileMover {
	public static function moveFile(string $old_public_id, string $new_destination) : array 
	{
		if(config('filesystems.default') === 'cloudinary') {
			$new_public_id = $new_destination . '/' . basename(self::normalizeCloudinaryPublicId($old_public_id));

			$result = Cloudinary::UploadApi()->rename(
				self::normalizeCloudinaryPublicId($old_public_id),
				$new_public_id
			);

			return [
				'public_id' => $result['public_id'],
				'secure_url' => $result['secure_url']
			];
		}

		if(config('filesystems.default') !== 'cloudinary') {
			Storage::disk(config('filesystems.default'))->move($old_public_id, $new_destination);

			return [
				'public_id' => $old_public_id,
				'secure_url' => Storage::disk(config('filesystems.default'))->url($new_destination . '/' . basename('$old_public_id'))
			];
		}

		return [
				'public_id' => null,
				'secure_url' => null
			];
	}

	public static function normalizeCloudinaryPublicId(string $public_id){
		return preg_replace('/\.[^.]+$/', '', $public_id);
	}
}
