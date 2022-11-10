<?php

namespace App\Utils;

use App\Enums\ProjectSettingsEnum;
use App\Models\Project;
use App\Models\ProjectSetting;

class ProjectSettingUtils
{
  static public function nudgeSetting()
  {
    $settingIDs = ProjectSetting::all()->pluck('project_id');
    $projectIDs = Project::whereNotIn('id', $settingIDs)->pluck('id');
    return collect($projectIDs)->map(function ($id) {
      return ['project_id' => $id, 'setting' => ProjectSettingsEnum::MUTE_NUDGE->toString(), 'status' => false];
    })->toArray();
  }
}
