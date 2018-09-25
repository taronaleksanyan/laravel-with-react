<?php

use Illuminate\Http\Request;
use App\Http\Resources\CompaniesCollection;
use App\Companies;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(['middleware' => ['api','jwt.auth']], function() {
    Route::resource('companies', 'Api\CompanyController');
    Route::resource('employees', 'Api\EmployeController');
    Route::post('/logo', 'Api\CompanyController@createlogo');
});

Route::post('/login', 'Api\LoginController@login');