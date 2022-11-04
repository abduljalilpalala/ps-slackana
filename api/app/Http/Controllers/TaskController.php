<?php

namespace App\Http\Controllers;

use App\Events\AssignTaskEvent;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Section;
use App\Models\Task;
use App\Notifications\AssignTaskNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TaskController extends Controller
{
  use CheckProjectRole;
  public function index(Project $project, Section $section)
  {
    if ($this->hasRole($project)) {
      return TaskResource::collection($section->tasks()->with(['project_member.user.avatar', 'project_member.role', 'project_member.teams'])->get());
    }
    return $this->unauthorizedAccess();
  }

  public function show(Project $project, Section $section, Task $task)
  {
    if ($this->hasRole($project)) {
      return new TaskResource(Task::with(['project_member.user.avatar', 'project_member.role', 'project_member.teams'])->findOrFail($task->id));
    }
    return $this->unauthorizedAccess();
  }

  public function store(Project $project, Section $section, StoreTaskRequest $request)
  {
    if ($this->isProjectOwner($project) || $this->isTeamLeader($project)) {
      $task = $section->tasks()->create($request->validated() + [
        'position' => $section->tasks->count() + 1
      ]);
      if ($request->project_member_id) {
        $member = ProjectMember::with('user')->findOrFail($request->project_member_id);
        Notification::send($member->user, new AssignTaskNotification(auth()->user()->id, $task->id, $project->id));
        event(new AssignTaskEvent($member->user, $project));
      }
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }

  public function update(Project $project, Section $section, UpdateTaskRequest $request, Task $task)
  {
    if ($this->isProjectOwner($project) || $this->isTeamLeader($project)) {
      $task->update($request->validated());
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }

  public function destroy(Project $project, Section $section, Task $task)
  {
    if ($this->isProjectOwner($project) || $this->isTeamLeader($project)) {
      $task->delete();
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
