<?php 

namespace App\Helpers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class FileDeleter{
  public static function delete(string $public_id) 
  {
    if(env('FILESYSTEM_DISK') === 'cloudinary') {
      Cloudinary::UploadApi()->destroy($public_id);
    } else {
      Storage::disk(env('FILESYSTEM_DISK'))->delete($public_id);
    }
  }
}