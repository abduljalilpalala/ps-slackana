<?php

namespace Database\Seeders;

use App\Models\ProjectSetting;
use App\Utils\ProjectSettingUtils;
use Illuminate\Database\Seeder;

class ProjectSettingSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    ProjectSetting::upsert(ProjectSettingUtils::nudgeSetting(), ['project_id'], ['status', 'setting']);
  }
}
