<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskPositionController extends Controller
{
  public function update(Project $project,Request $request)
  {
    $position=1;
    $tasks=collect($request->tasks)->reverse();
    foreach($tasks as $task){
      Task::whereId($task['id'])->update([
        'position' => $position++
      ]);
    }
    return response()->noContent();
  }
}
