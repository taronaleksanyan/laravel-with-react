<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use App\Http\Requests\LogoRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\File;
class FileController extends Controller
{
    public function store(LogoRequest $request) {
        $path = $request['logo'];
        $path = Storage::putFile('public', new File($path));
        return response()->json(['path' => $path]);
    }
}
