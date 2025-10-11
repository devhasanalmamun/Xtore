<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Rules\UploadImage;
use Exception;

class FileUploadController extends Controller
{
    public function __invoke(Request $request) 
    {
        $file = $request->file('file');
        $folder_path = "Xtore/temp";

        if($request->header('X-File-Path')) {
            $folder_path = $request->header('X-File-Path');
        }

        $request->validate(
            ['file' => ['required', new UploadImage(512)]],
            ['file.required' => 'Please select a image to upload.']
        );

        try {
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
}
