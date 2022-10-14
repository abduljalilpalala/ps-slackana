<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\StoreProjectMemberRequest;
use App\Http\Requests\UpdateProjectMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Project;
use App\Models\User;

class ProjectMemberController extends Controller
{
  public function index(Project $project)
  {
    if (request('filter')) {
      return MemberResource::collection($project->teams()->where('id', request('filter'))->first()->members()->with(['role', 'user.avatar', 'teams'])->get());
    }
    return MemberResource::collection($project->members()->with(['role', 'user.avatar', 'teams'])->get());
  }

  public function store(StoreProjectMemberRequest $request, Project $project)
  {
    $member = $project->members()->updateOrCreate(
      ['project_id' => $project->id, 'user_id' => intval($request->user_id)],
      ['is_removed' => 0, 'role_id' => RoleEnum::MEMBER->value]
    );
    $member->teams()->sync($request->teams);

    return response()->noContent();
  }

  public function update(UpdateProjectMemberRequest $request, Project $project, User $member)
  {
    $user = $project->members()->where('user_id', $member->id)->first();
    $user->teams()->sync($request->teams);

    return response()->noContent();
  }

  public function destroy(Project $project, User $member)
  {
    $user = $project->members()->where('user_id', $member->id)->first();
    $user->update(['is_removed' => 1]);
    $user->teams()->detach();

    return response()->noContent();
  }
}
