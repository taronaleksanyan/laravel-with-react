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

Route::group(['middleware' => ['api'] ], function() {
    Route::prefix('/companies')->group(function() {
        Route::get('/all','Api\CompaniesController@index');
        Route::post('/create', 'Api\CompaniesController@create');
        Route::get('{id}/editdata', 'Api\CompaniesController@edit');
        Route::post('{id}/update', 'Api\CompaniesController@update');
        Route::delete('{id}/delete', 'Api\CompaniesController@delete');
        
    } );
    
});
