<?php

namespace Database\Seeders;

use App\Enums\NotificationEnum;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $settings = [[
      'id' => NotificationEnum::TASK_REMINDER,
      'description' => NotificationEnum::tryFrom(NotificationEnum::TASK_REMINDER->value)->toString()
    ]];

    Setting::upsert($settings, ['id'], ['description']);
  }
}
