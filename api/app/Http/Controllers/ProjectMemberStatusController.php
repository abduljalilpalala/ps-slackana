<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectMemberStatusController extends Controller
{
  public function store(Request $request, Project $project)
  {
    $member = $project->members()->where('user_id', $request->user_id)->first();

    $status = ($member->role_id === RoleEnum::TEAM_LEADER->value) ? RoleEnum::MEMBER->value : RoleEnum::TEAM_LEADER->value;

    $member->update(['role_id' => $status]);

    return response()->noContent();
  }

  public function destroy(Project $project)
  {
    $member = $project->members()->where('user_id', auth()->user()->id)->first();
    $member->update(['is_removed' => 1]);

    return response()->noContent();
  }
}
