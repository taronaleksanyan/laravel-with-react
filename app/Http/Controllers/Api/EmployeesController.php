<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Emloyees;
class EmployeesController extends Controller
{
    public function index() 
    {
        return new CompaniesCollection(Companies::all());
    }

    public function create(Request $request) 
    {
        $result = $request->all();

        $model = new Companies();
        $employe = $request->all();
        $model->name = $employe['name'];
        $model->email = $employe['email'];
        $model->website = $employe['website'];
        $path = $request['logo'];
        $path = Storage::putFile('logos', new File($path));
        $model->logo = $path;

        if($model->save() ) {
            return 'Company created successfully';   
        };
        return 'something went wrong';  
    }

    public function edit(Request $request, $id) 
    {
        $employe = Companies::find($id);
        return response()->json([
            'data' => $employe
        ]);
    }
    public function update(Request $request, $id) 
    {
        
         $result = $request->all();

         $model = Companies::find($id);
        $employe = $request->all();
        $model->name = $employe['name'];
        $model->email = $employe['email'];
        $model->website = $employe['website'];
        if($request['logo']) {
            $path = $request['logo'];
            $path = Storage::putFile('logos', new File($path));
            $model->logo = $path;

        }
       
        if($model->save() ) {
            return 'Company Updated successfully';   
        };
        return 'something went wrong'; 
    }

    public function delete(Request $request, $id) 
    {
       $employe = Companies::find($id); 
       $employe->delete(); 
       return $id;
        
        
    }
}
