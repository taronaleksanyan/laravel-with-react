<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompaniesCollection;
use App\Companies;


class CompaniesController extends Controller
{
    public function index() 
    {
        return new CompaniesCollection(Companies::all());
    }

    public function create(Request $request) 
    {
        $result = $request->all()['company'];
        return $result;

    }

    public function update() 
    {

    }

    public function delete() 
    {

    }
}
