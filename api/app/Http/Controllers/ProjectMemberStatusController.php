<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectMemberStatusController extends Controller
{

  public function destroy(Project $project)
  {
    $member = $project->members()->where('user_id', auth()->user()->id)->first();
    $member->update(['is_removed' => 1]);
    
    return response()->noContent();
  }
}
