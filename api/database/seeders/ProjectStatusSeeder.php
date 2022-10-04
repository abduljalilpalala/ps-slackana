<?php

namespace Database\Seeders;

use App\Enums\ProjectStatusEnum;
use App\Models\ProjectStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $roles = [
      [
        'id' => ProjectStatusEnum::ON_TRACK,
        'name' => ProjectStatusEnum::tryFrom(ProjectStatusEnum::ON_TRACK->value)->toString()
      ],
      [
        'id' => ProjectStatusEnum::AT_RISK,
        'name' => ProjectStatusEnum::tryFrom(ProjectStatusEnum::AT_RISK->value)->toString()
      ],
      [
        'id' => ProjectStatusEnum::OFF_TRACK,
        'name' => ProjectStatusEnum::tryFrom(ProjectStatusEnum::OFF_TRACK->value)->toString()
      ],
      [
        'id' => ProjectStatusEnum::ON_HOLD,
        'name' => ProjectStatusEnum::tryFrom(ProjectStatusEnum::ON_HOLD->value)->toString()
      ],
      [
        'id' => ProjectStatusEnum::COMPLETE,
        'name' => ProjectStatusEnum::tryFrom(ProjectStatusEnum::COMPLETE->value)->toString()
      ],
    ];

    ProjectStatus::upsert($roles, ['id'], ['name']);
  }
}
