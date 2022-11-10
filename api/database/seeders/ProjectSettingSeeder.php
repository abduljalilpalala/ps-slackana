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
    $settings = ProjectSettingUtils::nudgeSetting();
    foreach ($settings as $setting) {
      ProjectSetting::firstOrCreate($setting);
    }
  }
}
