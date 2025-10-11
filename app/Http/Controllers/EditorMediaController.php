<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EditorMediaController extends Controller
{
    public function __invoke(Request $request)
    {
        $file = $request->file('file');
        $folder_path = "Xtore/temp";

        if($request->header('X-File-Path')) {
            $folder_path = $request->header('X-File-Path');
        }

        $image_public_id = Storage::put($folder_path, $file);
        $image_url = Storage::url($image_public_id);

        return response()->json([
            'key' => Str::ulid()->toString(),
            'name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'type' => $file->getClientMimeType(),
            'url' => $image_url
        ]);
    }
}
