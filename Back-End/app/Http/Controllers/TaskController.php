<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TaskResource;
use App\Http\Requests\TaskRequest;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::user()->id)->get();
        return  response(TaskResource::collection($tasks), 201);
    }




    public function store(TaskRequest $request)
    {
      
        $data = [];
        $data = $request->input();
        $task = Task::create([
          'name'=> $data['name'],
          'description'=> $data['description'],
          'status' => $data['status'],
          'slug'=> Str::slug($data['name'], '-'),
          'user_id'=> Auth::user()->id



        ]);
        return response(["message" => " Task Created"], 201);
    }


    public function show($id)
    {
        $task = TasK::where('id', $id)->first();
        if ($task && $task->user_id == Auth::user()->id) {
            return new TaskResource($task);
        }
        return response(['error' => "Not Found"], 404);
    }





    public function update(TaskRequest $request, $id)
    {
        $date=[];
        $data = $request->input();
        $task = TasK::where('id', $id)->first();
        if ($task && $task->user_id == Auth::user()->id) {
            $task->update($data);
            return response(['message' => "Updated Successfully"], 201);
        }
        return response(['error' => "Not Found"], 404);
    }


    public function destroy($id)
    {
        $task = TasK::where('id', $id)->first();
        if ($task && $task->user_id == Auth::user()->id) {
            Task::destroy($task->id);
            return response(['message' => "Deleted Successfully"], 201);
        }
        return response(['error' => "Not Found"], 404);
    }
}
