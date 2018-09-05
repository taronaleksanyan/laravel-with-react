<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompaniesCollection;
use App\Employees;
class EmployeesController extends Controller
{
    public function index() 
    {
        return new CompaniesCollection(Employees::all());
    }

    public function create(Request $request) 
    {
        $model = new Employees();
        $employe = $request->all();
        $model->firstName = $employe['firstName'];
        $model->lastName = $employe['lastName'];
        $model->email = $employe['email'];
        $model->company = $employe['company'];        
        $model->phone = $employe['phone'];
        if($model->save() ) {
            return 'Employe Created successfully';   
        };
        return 'something went wrong'; 
    }

    public function edit(Request $request, $id) 
    {
        $employe = Employees::find($id);
        return response()->json([
            'data' => $employe
        ]);
    }
    public function update(Request $request, $id) 
    {
        
        $result = $request->all();
        $model = Employees::find($id);
        $employe = $request->all();
        $model->firstName = $employe['firstName'];
        $model->lastName = $employe['lastName'];
        $model->email = $employe['email'];
        $model->company = $employe['company'];        
        $model->phone = $employe['phone'];
        if($model->save() ) {
            return 'Employe Updated successfully';   
        };
        return 'something went wrong'; 
    }

    public function delete(Request $request, $id) 
    {
       $employe = new Employees(); 
       $employe->destroy($id); 
       return $id;
        
        
    }

    public function paginate() 
    {
        $employees = Employees::paginate(10);
        return response()->json($employees);
    }
}
