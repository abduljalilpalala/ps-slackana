<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
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
        'id' => RoleEnum::PROJECT_OWNER,
        'name' => RoleEnum::tryFrom(RoleEnum::PROJECT_OWNER->value)->toString()
      ],
      [
        'id' => RoleEnum::TEAM_LEADER,
        'name' => RoleEnum::tryFrom(RoleEnum::TEAM_LEADER->value)->toString()
      ],
      [
        'id' => RoleEnum::MEMBER,
        'name' => RoleEnum::tryFrom(RoleEnum::MEMBER->value)->toString()
      ],
    ];

    Role::upsert($roles, ['id'], ['name']);
  }
}
