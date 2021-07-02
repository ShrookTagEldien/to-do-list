<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

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


Route::post('/createTask', "TaskController@create");
Route::get('/list', "TaskController@index");
Route::post('/setStatus', "TaskController@setStatus");
Route::post('/deleteTask', "TaskController@deleteTask");
Route::post('/editTask', "TaskController@editTask");
