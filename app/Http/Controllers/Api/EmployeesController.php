<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Employe;
use App\Http\Requests\EmployeRequest;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if( $request->query('page') ) {
            return Employe::paginate(1);
        }
        return Employe::all();
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
     * @param  App\Http\Requests\EmployeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeRequest $request, Employe $employe )
    {
       
        $employe->first_name = $request['first_name'];
        $employe->last_name = $request['last_name'];
        $employe->email = $request['email'];
        $employe->company = $request['company'];        
        $employe->phone = $request['phone'];
        $employe->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Employe::find($id);
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
     * @param  App\Http\Requests\EmployeRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeRequest $request, $id)
    {
        $employe = Employe::find($id);
        $employe->first_name = $request['first_name'];
        $employe->last_name = $request['last_name'];
        $employe->email = $request['email'];
        $employe->company = $request['company'];        
        $employe->phone = $request['phone'];
        $employe->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Employe::destroy($id);
        return $id;
    }
}
