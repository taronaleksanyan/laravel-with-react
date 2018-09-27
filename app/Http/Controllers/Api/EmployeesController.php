<?php

namespace App\Http\Controllers\Api;

use App\Employe;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeRequest;
use Illuminate\Http\Request;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->query('page')) {
            return Employe::paginate($request->query('count'));
        }
        return Employe::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\EmployeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeRequest $request, Employe $employe)
    {
        $employe->first_name = $request['first_name'];
        $employe->last_name = $request['last_name'];
        $employe->email = $request['email'];
        $employe->company = $request['company'];
        $employe->phone = $request['phone'];
        $employe->save();
        return response()->json(['newEmploye' => $employe], 200);
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
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\EmployeRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeRequest $request, $id)
    {
        $employe = Employe::find($id);
        $employe->update($request->all());
        $employe->save();
        return response()->json(null, 204);
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
        return response()->json(null, 204);
    }
}
