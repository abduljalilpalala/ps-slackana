<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskDueDateRequest;
use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskDueDateController extends Controller
{
  use CheckProjectRole;
  public function update(Project $project, UpdateTaskDueDateRequest $request, Task $task)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $task->update($request->validated());
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
