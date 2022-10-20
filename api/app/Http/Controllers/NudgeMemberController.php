<?php

namespace App\Http\Controllers;

use App\Events\NudgeMemberEvent;
use App\Models\Project;
use App\Models\User;

class NudgeMemberController extends Controller
{
  public function show(Project $project, User $member)
  {
    event(new NudgeMemberEvent($project, $member));
    
    return response()->noContent();
  }
}
