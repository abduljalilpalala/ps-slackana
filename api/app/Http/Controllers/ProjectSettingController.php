<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectSettingRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectSettingController extends Controller
{
  public function update(Project $project, UpdateProjectSettingRequest $request)
  {
    $project->settings()->getSetting($request->setting)->update([
      'status' => $request->status
    ]);
    return response()->noContent();
  }
}
