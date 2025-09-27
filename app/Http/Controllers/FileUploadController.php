<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Rules\UploadImage;
use Exception;

class FileUploadController extends Controller
{
    public function uploadProductThumbnail(Request $request) 
    {
        $request->validate(
            ['file' => ['required', new UploadImage(256)]],
            ['file.required' => 'Product thumbnail is required.']
        );

        try {
            $file = $request->file('file');
            $temp_path = "Xtore/temp";

            $thumbnail_public_id = Storage::disk(env('FILESYSTEM_DISK'))->put($temp_path, $file);
            $thumbnail_url = Storage::disk(env('FILESYSTEM_DISK'))->url($thumbnail_public_id);

            return response()->json([
                    'public_id'=> $thumbnail_public_id,
                    'secure_url' => $thumbnail_url
                ]
            );
        } catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => "{$e->getMessage()}"
            ]);
        }
    }
}
