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
        $folder_path = '';

        if($request->header('X-File-Path')) {
            $folder_path = $request->header('X-File-Path');
        } else {
            $folder_path = "Xtore/temp";
        }

        $request->validate(
            ['file' => ['required', new UploadImage(512)]],
            ['file.required' => 'Please select a image to upload.']
        );

        try {
            $file = $request->file('file');

            $thumbnail_public_id = Storage::put($folder_path, $file);
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
