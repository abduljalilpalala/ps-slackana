<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskSectionRequest;
use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskSectionController extends Controller
{
  public function update(Project $project,UpdateTaskSectionRequest $request,Task $task)
  {
    $task->update($request->validated());
    return response()->noContent();
  }
}
