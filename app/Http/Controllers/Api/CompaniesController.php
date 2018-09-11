<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
use Illuminate\Http\File;
use App\Http\Requests\CompanyRequest;
use Illuminate\Support\Facades\Storage;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->query('page')) {
            return Company::paginate(1);
        }
        return Company::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request, Company $model)
    {
        dd(1);
            $company = $request->all();
            $model->name = $company['name'];
            $model->email = $company['email'];
            $model->website = $company['website'];
            $path = $request['logo'];
            $path = Storage::putFile('public', new File($path));
            $model->logo = $path;

            if($model->save()) {
                $msg = 'Company created successfully';
                $status = 200;
            } else {
                $msg = 'something went wrong';
                $status = 500;
            }

            return response()->json(['msg' => $msg], $status);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        return $company;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $model)
    {
        dd($request->all());

        $company = $request->all();
        $model->name = $company['name'];
        $model->email = $company['email'];
        $model->website = $company['website'];
        
        if($request['logo']) {
            $path = $request['logo'];
            $path = Storage::putFile('public', new File($path));
            $model->logo = $path;
        }

        if($model->save()) {
            $msg = 'Company edited successfully';
            $status = 200;
        } else {
            $msg = 'something went wrong';
            $status = 500;
        }

        return response()->json(['msg' => $msg], $status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        if($company->delete()) {
            return response()->json('company deleted');
        }
        

    }
}
