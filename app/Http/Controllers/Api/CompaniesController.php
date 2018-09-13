<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
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
     * @param  App\Http\Requests\CompanyRequest  $request
     * @param  App\Company
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request, Company $company)
    {
            $company->name = $request['name'];
            $company->email = $request['email'];
            $company->website = $request['website'];
            $company->logo = $request['logo'];
            $company->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  App\Company
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
     * @param  App\Http\Requests\CompanyRequest  $request
     * @param  App\Company
     * @return \Illuminate\Http\Response
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $company->name = $request['name'];
        $company->email = $request['email'];
        $company->website = $request['website'];
        if($company->logo !== $request['logo'] ) {
            Storage::delete($request->logo);
            $company->logo = $request['logo'];
        }
        $company->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Company
     * @return App\Company
     */
    public function destroy(Company $company)
    {
        Storage::delete($company->logo);
        $company->delete();
        return $company;
        
        

    }
}
