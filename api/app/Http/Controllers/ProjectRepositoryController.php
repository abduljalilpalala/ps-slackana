<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectRepoRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectRepositoryController extends Controller
{
  public function update(UpdateProjectRepoRequest $request, Project $project)
  {
    $project->update($request->validated());
    return response()->noContent();
  }
}
