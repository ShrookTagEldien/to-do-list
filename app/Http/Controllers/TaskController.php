<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class TaskController extends Controller
{
    //
    public function create(Request $request)
    {
        $data=array('title'=>$request->title,"description"=>$request->description,"status"=>'notFinished','user_id'=>$request->user);
        DB::table('tasks')->insert($data);
        return $request->all();
    }
    public function index(Request $request)
    {
        $tasks = DB::table('tasks')->where('user_id', $request->user)->get();
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
    public function editTask(Request $request)
    {
        DB::table('tasks')
            ->where('id', $request->id)
            ->update(['title' => $request->title,'description'=>$request->description]);
        return DB::select('select * from tasks');
    }
}
