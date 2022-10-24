<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\StoreProjectMemberRequest;
use App\Http\Requests\UpdateProjectMemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;

class ProjectMemberController extends Controller
{
  public function index(Project $project)
  {
    if (request('filter')) {
      return MemberResource::collection($project->teams()->where('id', request('filter'))->first()->members()->with(['role', 'user.avatar', 'teams'])->get());
    }
    if(request('search')){
      return MemberResource::collection($project->members()->whereHas('user', function($query){
        $query->where('name', 'ilike', '%' . request('search') . '%');
      } )->with(['user.avatar','role', 'teams'])->get());
    }
    return MemberResource::collection($project->members()->with(['role', 'user.avatar', 'teams'])->get());
  }

  public function show(Project $project, User $member)
  {
    $project->members()->where('user_id', $member->id)->firstOrFail();
    return response()->noContent();
  }

  public function store(StoreProjectMemberRequest $request, Project $project)
  {
    $member = ProjectMember::updateOrCreate([
      'user_id' => $request->user_id,
      'project_id' => $project->id,
    ],[
      'is_removed' => 0,
      'role_id' => RoleEnum::MEMBER->value
    ]);
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
