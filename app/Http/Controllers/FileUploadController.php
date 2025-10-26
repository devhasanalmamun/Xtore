<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Rules\UploadImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function __invoke(Request $request)
    {
        $file = $request->file('file');
        $folder_path = '/temp';

        if ($request->header('X-File-Path')) {
            $folder_path = $request->header('X-File-Path');
        }

        $request->validate(
            ['file' => ['required', new UploadImage(512)]],
            ['file.required' => 'Please select a image to upload.']
        );

        try {
            $path = Storage::put($folder_path, $file);
            $thumbnail_image = Storage::url($path);

            return response()->json($thumbnail_image);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "{$e->getMessage()}",
            ]);
        }
    }
}
