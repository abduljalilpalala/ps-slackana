<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionRequest;
use App\Http\Resources\SectionResource;
use App\Http\Traits\CheckProjectRole;
use App\Models\Project;
use App\Models\Section;

class SectionController extends Controller
{
  use CheckProjectRole;
  public function index(Project $project)
  {
    if($this->hasRole($project)){
      return SectionResource::collection($project->sections()->with('tasks.user')->get());
    }
    return $this->unauthorizedAccess();
  }

  public function store(Project $project,StoreSectionRequest $request)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $project->sections()->create($request->validated());
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }

  public function update(Project $project,UpdateSectionRequest $request,Section $section)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $section->update($request->validated());
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }

  public function destroy(Project $project,Section $section)
  {
    if($this->isProjectOwner($project) || $this->isTeamLeader($project)){
      $section->delete();
      return response()->noContent();
    }
    return $this->unauthorizedAccess();
  }
}
