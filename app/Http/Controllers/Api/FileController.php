<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\File;
class FileController extends Controller
{
    public function store(Request $request) {
        $request->validate(
            ['logo' =>  'dimensions:min_width=100,min_height=100']
        );
        $path = $request['logo'];
        $path = Storage::putFile('public', new File($path));
        return response()->json(['path' => $path]);
    }
}
