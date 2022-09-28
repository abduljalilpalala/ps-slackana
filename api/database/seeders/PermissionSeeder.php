<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $permissions = [
      [
        'id' => PermissionEnum::ADD_MEMBER,
        'name' => PermissionEnum::tryFrom(PermissionEnum::ADD_MEMBER->value)->toString()
      ],
      [
        'id' => PermissionEnum::REMOVE_MEMBER,
        'name' => PermissionEnum::tryFrom(PermissionEnum::REMOVE_MEMBER->value)->toString(),
      ],
      [
        'id' => PermissionEnum::NUDGE_MEMBER,
        'name' => PermissionEnum::tryFrom(PermissionEnum::NUDGE_MEMBER->value)->toString(),
      ],
      [
        'id' => PermissionEnum::LEAVE_PROJECT,
        'name' => PermissionEnum::tryFrom(PermissionEnum::LEAVE_PROJECT->value)->toString(),
      ],
      [
        'id' => PermissionEnum::ASSIGN_TEAM_LEADER,
        'name' => PermissionEnum::tryFrom(PermissionEnum::ASSIGN_TEAM_LEADER->value)->toString(),
      ],
      [
        'id' => PermissionEnum::SET_MVP,
        'name' => PermissionEnum::tryFrom(PermissionEnum::SET_MVP->value)->toString(),
      ],
      [
        'id' => PermissionEnum::SET_PROJECT_STATUS,
        'name' => PermissionEnum::tryFrom(PermissionEnum::SET_PROJECT_STATUS->value)->toString(),
      ],
      [
        'id' => PermissionEnum::ARCHIVE_PROJECT,
        'name' => PermissionEnum::tryFrom(PermissionEnum::ARCHIVE_PROJECT->value)->toString(),
      ],
      [
        'id' => PermissionEnum::EDIT_PROJECT,
        'name' => PermissionEnum::tryFrom(PermissionEnum::EDIT_PROJECT->value)->toString(),
      ],
      [
        'id' => PermissionEnum::ADD_TEAM,
        'name' => PermissionEnum::tryFrom(PermissionEnum::ADD_TEAM->value)->toString(),
      ],
      [
        'id' => PermissionEnum::EDIT_TEAM,
        'name' => PermissionEnum::tryFrom(PermissionEnum::EDIT_TEAM->value)->toString(),
      ],
      [
        'id' => PermissionEnum::REMOVE_TEAM,
        'name' => PermissionEnum::tryFrom(PermissionEnum::REMOVE_TEAM->value)->toString(),
      ],
      [
        'id' => PermissionEnum::CREATE_SECTION,
        'name' => PermissionEnum::tryFrom(PermissionEnum::CREATE_SECTION->value)->toString(),
      ],
      [
        'id' => PermissionEnum::RENAME_SECTION,
        'name' => PermissionEnum::tryFrom(PermissionEnum::RENAME_SECTION->value)->toString(),
      ],
      [
        'id' => PermissionEnum::REMOVE_SECTION,
        'name' => PermissionEnum::tryFrom(PermissionEnum::REMOVE_SECTION->value)->toString(),
      ],
      [
        'id' => PermissionEnum::ASSIGN_DUE_DATES,
        'name' => PermissionEnum::tryFrom(PermissionEnum::ASSIGN_DUE_DATES->value)->toString(),
      ],
      [
        'id' => PermissionEnum::CREATE_TASK,
        'name' => PermissionEnum::tryFrom(PermissionEnum::CREATE_TASK->value)->toString(),
      ],
      [
        'id' => PermissionEnum::RENAME_TASK,
        'name' => PermissionEnum::tryFrom(PermissionEnum::RENAME_TASK->value)->toString(),
      ],
      [
        'id' => PermissionEnum::DELETE_TASK,
        'name' => PermissionEnum::tryFrom(PermissionEnum::DELETE_TASK->value)->toString(),
      ],
      [
        'id' => PermissionEnum::ASSIGN_TASK,
        'name' => PermissionEnum::tryFrom(PermissionEnum::ASSIGN_TASK->value)->toString(),
      ],
      [
        'id' => PermissionEnum::SET_TASK_AS_COMPLETED,
        'name' => PermissionEnum::tryFrom(PermissionEnum::SET_TASK_AS_COMPLETED->value)->toString(),
      ],
      [
        'id' => PermissionEnum::MOVE_TASK,
        'name' => PermissionEnum::tryFrom(PermissionEnum::MOVE_TASK->value)->toString(),
      ],
    ];
    Permission::upsert($permissions, ['id'], ['name']);
  }
}
