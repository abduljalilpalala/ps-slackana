<?php

namespace App\Utils;

use App\Models\ProjectSetting;

class ProjectSettings
{
  static public function settings($id)
  {
    return collect(ProjectSetting::project($id)->get())->mapWithKeys(function ($item) {
      return [$item['setting'] => $item['status']];
    });
  }
}
