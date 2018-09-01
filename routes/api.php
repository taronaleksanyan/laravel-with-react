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

Route::middleware('api')->group(function() {
    Route::prefix('companies')->group(function() {
        Route::get('/','Api\CompaniesController@index');
        Route::post('/create', 'Api\CompaniesController@create');
        Route::post('/edit', 'Api\CompaniesController@edit');
    } );
    
});