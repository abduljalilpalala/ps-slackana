<?php

namespace App\Http\Controllers;

use App\Enums\ProjectSettingsEnum;
use App\Events\NudgeMemberEvent;
use App\Models\Project;
use App\Models\User;

class NudgeMemberController extends Controller
{
  public function show(Project $project, User $member)
  {
    $muteNudge = $project->settings()->getSetting(ProjectSettingsEnum::MUTE_NUDGE->toString())->first();
    if (!$muteNudge->status && !$project->is_archived) {
      event(new NudgeMemberEvent($project, $member));
    }
    return response()->noContent();
  }
}
