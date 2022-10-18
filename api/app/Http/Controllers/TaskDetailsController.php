<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskDetailsRequest;
use App\Http\Resources\TaskResource;
use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskDetailsController extends Controller
{
  use CheckProjectRole;
  public function show(Project $project, Task $task)
  {
    if($this->hasRole($project)){
      return new TaskResource(Task::with(['project_member.user.avatar','project_member.role','project_member.teams'])->findOrFail($task->id));
    }
    return $this->unauthorizedAccess();
  }
  public function update(Project $project, UpdateTaskDetailsRequest $request, Task $task)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $task->update($request->validated());
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
