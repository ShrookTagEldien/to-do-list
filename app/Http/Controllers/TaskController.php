<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class TaskController extends Controller
{
    //
    public function create(Request $request)
    {
        $data=array('title'=>$request->title,"description"=>$request->description,"status"=>'notFinished');
        DB::table('tasks')->insert($data);
        return $request->all();
    }
    public function index()
    {
        $tasks = DB::select('select * from tasks');
        return $tasks;
    }
    public function setStatus(Request $request)
    {
        DB::table('tasks')
            ->where('id', $request->id)
            ->update(['status' => "Finished"]);
        return DB::select('select * from tasks');
    }
    public function deleteTask(Request $request)
    {
        DB::table('tasks')
        ->where('id', $request->id)
        ->delete();
        return DB::select('select * from tasks');
    }
}
