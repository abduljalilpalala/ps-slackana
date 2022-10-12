<?php

namespace App\Http\Controllers;

use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Task;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
  use CheckProjectRole;
  public function update(Project $project, Task $task)
  {
    $member = ProjectMember::where([
      ['project_id', '=', $project->id],
      ['user_id', '=', auth()->user()->id],
    ])->first();

    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $task->update([
        'is_completed' => !($task->is_completed)
      ]);
      return response()->noContent();
    }
    
    if($this->isMember($project) && $task->project_member_id === $member->id){
        $task->update([
          'is_completed' => !($task->is_completed)
        ]);
        return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
