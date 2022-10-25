<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskReorderController extends Controller
{
    public function update(Project $project,Section $section)
    {
      $position=1;
      $tasks=Task::where('section_id',$section->id)->orderBy('position','ASC')->get();
      foreach($tasks as $task){
        Task::whereId($task->id)->update([
          'position' => $position++
        ]);
      }
      return response()->noContent();
    }
}
