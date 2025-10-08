<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Rules\UploadImage;
use Exception;

class FileUploadController extends Controller
{
    public function uploadProductImage(Request $request) 
    {
        $request->validate(
            ['file' => ['required', new UploadImage(512)]],
            ['file.required' => 'Please select a image to upload.']
        );

        try {
            $file = $request->file('file');
            $temp_path = "Xtore/temp";

            $thumbnail_public_id = Storage::put($temp_path, $file);
            $thumbnail_url = Storage::url($thumbnail_public_id);

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

    public function deleteProductImage() 
    {
        return 'yo';
    }
}
