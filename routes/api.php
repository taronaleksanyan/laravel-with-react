<?php

use Illuminate\Http\Request;
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

Route::group(['middleware' => ['api', 'jwt.auth']], function () {
    Route::resource('companies', 'Api\CompaniesController')->except(['edit', 'create']);
    Route::resource('employees', 'Api\EmployeesController')->except(['edit', 'create']);
    Route::post('/logo', 'Api\CompaniesController@createlogo');
});

Route::post('/login', 'Api\LoginController@login');
