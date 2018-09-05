<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompaniesCollection;
use App\Companies;
use Illuminate\Http\File;
use App\Http\Requests\UploadLogos;
use Illuminate\Support\Facades\Storage;


class CompaniesController extends Controller
{
    public function index() 
    {
        return new CompaniesCollection(Companies::all());
    }

    public function create(UploadLogos $request) 
    {

        $model = new Companies();
        $company = $request->all();
        $v = $request->validated();
        if($v) {
            $model->name = $company['name'];
            $model->email = $company['email'];
            $model->website = $company['website'];
            $path = $request['logo'];
            $path = Storage::putFile('public', new File($path));
            $model->logo = $path;
           
        }
        if($model->save() ) {
            return 'Company created successfully';   
        };
    
        return 'something went wrong';  
    }

    public function edit(Request $request, $id) 
    {
        $company = Companies::find($id);
        return response()->json([
            'data' => $company
        ]);
    }

    public function update(UploadLogos $request, $id) 
    {
        
         $result = $request->all();
        $v = $request->validated();
        $model = Companies::find($id);
        $company = $request->all();
        
            $model->name = $company['name'];
            $model->email = $company['email'];
            $model->website = $company['website'];
            if($v) {
                if($request['logo']) {
                    $path = $request['logo'];
                    $path = Storage::putFile('public', new File($path));
                    $model->logo = $path;
        
                }
            }
        if($model->save()) {
            return 'Company updated successfully';
        }
       
        return 'something went wrong';
    }

    public function delete(Request $request, $id) 
    {
       $company = new Companies(); 
       $company->destroy($id); 
       return $id;
        
        
    }
    
    public function paginate() 
    {
        $companies = Companies::paginate(10);
        return response()->json($companies);
    }
}
