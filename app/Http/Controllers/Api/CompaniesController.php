<?php

namespace App\Http\Controllers\Api;

use App\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Requests\LogoRequest;
use Illuminate\Http\File;
use Illuminate\Http\Request;
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
        if ($request->query('page')) {
            return Company::paginate($request->query('count'));
        }
        return Company::all();
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
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\CompanyRequest  $request
     * @param  App\Company
     * @return \Illuminate\Http\Response
     */
    public function update(CompanyRequest $request, Company $company)
    {

        $company->update($request->all());

        if ($company->logo !== $request['logo']) {
            Storage::delete($company->logo);
        }
        $company->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Http\Requests\LogoRequest
     * @return App\Company
     */
    public function destroy(Company $company)
    {
        Storage::delete($company->logo);
        $company->delete();
        return $company;

    }
    /**
     * Create logo image
     *
     * @param  App\Company
     * @param \Illuminate\Http\Response
     */
    public function createlogo(LogoRequest $request)
    {
        $path = $request['logo'];
        $path = Storage::putFile('public', new File($path));
        return response()->json(['path' => $path]);
    }
}
