<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectStatusRequest;
use App\Models\Project;

class ProjectStatusController extends Controller
{
    public function update(ProjectStatusRequest $request, Project $project)
    {
      $project->update(['status_id' => $request->status]);
      return response()->noContent();
    }
}
