<?php

namespace App\Http\Controllers;

use App\Events\AssignTaskEvent;
use App\Http\Requests\UpdateTaskAssignmentRequest;
use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Task;
use App\Notifications\AssignTaskNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TaskAssignmentController extends Controller
{
  use CheckProjectRole;

  public function update(Project $project, UpdateTaskAssignmentRequest $request, Task $task)
  {
    if ($this->isProjectOwner($project) || $this->isTeamLeader($project)) {
      $taskMemberID = $task->project_member_id;
      $task->update($request->validated());
      $member = ProjectMember::with('user')->findOrFail($request->project_member_id);
      if (intval($taskMemberID) !== intval($request->project_member_id)) {
        Notification::send($member->user, new AssignTaskNotification(auth()->user()->id, $task->id, $project->id));
        event(new AssignTaskEvent($member->user));
      }
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
