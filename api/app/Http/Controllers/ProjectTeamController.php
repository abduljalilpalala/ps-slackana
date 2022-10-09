<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\TeamResource;
use App\Models\Team;
use Illuminate\Http\Request;

class ProjectTeamController extends Controller
{
  public function index(Project $project)
  {
    return TeamResource::collection($project->teams);
  }

  public function store(StoreProjectRequest $request, Project $project)
  {
    foreach ($request->teams as $team) {
      $project->teams()->firstOrCreate($team);
    }
    return response()->noContent();
  }

  public function show(Project $project, Team $team)
  {
    return new TeamResource($project->teams()->findOrFail($team->id));
  }

  public function update(Request $request, Project $project, Team $team)
  {
    if (!$project->teams()->where('name', $request->name)->exists()) {
      $project->teams()->find($team->id)->update([
        'name' => $request->name
      ]);
      return response()->noContent();
    }

    return response()->json([
      'message' => 'Team already exists'
    ], 403);
  }

  public function destroy(Project $project, Team $team)
  {
    $project->teams()->find($team->id)->delete();
    return response()->noContent();
  }
}
