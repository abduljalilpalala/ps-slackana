<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use Illuminate\Http\Request;

class TaskReorderController extends Controller
{
    public function update(Project $project,Section $section)
    {
      $position=1;
      foreach($section->tasks as $task){
        $task->update([
          'position'=>$position++
        ]);
      }
      return response()->noContent();
    }
}
