<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  use CheckProjectRole;
  public function index(Project $project, Section $section)
  {
    if($this->hasRole($project)){
      return TaskResource::collection($section->tasks()->with(['project_member.user.avatar','project_member.role','project_member.teams'])->get());
    }
    return $this->unauthorizedAccess();
  }

  public function show(Project $project, Section $section, Task $task)
  {
    if($this->hasRole($project)){
      return new TaskResource(Task::with(['project_member.user.avatar','project_member.role','project_member.teams'])->find($task->id));
    }
    return $this->unauthorizedAccess();
  }

  public function store(Project $project, Section $section, StoreTaskRequest $request)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $section->tasks()->create($request->validated()+[
        'position' => $section->tasks->count() + 1
      ]);
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }

  public function update(Project $project, Section $section, UpdateTaskRequest $request, Task $task)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $task->update($request->validated());
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
  
  public function destroy(Project $project, Section $section, Task $task)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $task->delete();
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
