<?php

namespace App\Helpers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class FileDeleter{
  public static function delete(string $public_id): void
  {
    if(config('filesystems.default') === 'cloudinary') {
      Cloudinary::UploadApi()->destroy($public_id);
    } else {
      Storage::delete($public_id);
    }
  }
}
