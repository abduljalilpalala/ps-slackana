<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionRolesSeeder extends Seeder
{
  /**
   * Run the database   seeds.
   *
   * @return void
   */
  public function run()
  {
    $projectOwner = Role::find(RoleEnum::PROJECT_OWNER)->permissions();
    $projectOwner->sync([
      PermissionEnum::ADD_MEMBER->value,
      PermissionEnum::REMOVE_MEMBER->value,
      PermissionEnum::NUDGE_MEMBER->value,
      PermissionEnum::ASSIGN_TEAM_LEADER->value,
      PermissionEnum::SET_MVP->value,
      PermissionEnum::SET_PROJECT_STATUS->value,
      PermissionEnum::ARCHIVE_PROJECT->value,
      PermissionEnum::EDIT_PROJECT->value,
      PermissionEnum::ADD_TEAM->value,
      PermissionEnum::EDIT_TEAM->value,
      PermissionEnum::REMOVE_TEAM->value,
      PermissionEnum::CREATE_SECTION->value,
      PermissionEnum::RENAME_SECTION->value,
      PermissionEnum::REMOVE_SECTION->value,
      PermissionEnum::ASSIGN_DUE_DATES->value,
      PermissionEnum::CREATE_TASK->value,
      PermissionEnum::RENAME_TASK->value,
      PermissionEnum::DELETE_TASK->value,
      PermissionEnum::ASSIGN_TASK->value,
      PermissionEnum::SET_TASK_AS_COMPLETED->value,
      PermissionEnum::MOVE_TASK->value,
      PermissionEnum::UPLOAD_FILE->value,
      PermissionEnum::DOWNLOAD_FILE->value,
      PermissionEnum::DELETE_FILE->value,
      PermissionEnum::RENAME_FILE->value,
    ]);

    $teamLeader = Role::find(RoleEnum::TEAM_LEADER)->permissions();
    $teamLeader->sync([
      PermissionEnum::ADD_MEMBER->value,
      PermissionEnum::REMOVE_MEMBER->value,
      PermissionEnum::NUDGE_MEMBER->value,
      PermissionEnum::LEAVE_PROJECT->value,
      PermissionEnum::SET_MVP->value,
      PermissionEnum::SET_PROJECT_STATUS->value,
      PermissionEnum::ARCHIVE_PROJECT->value,
      PermissionEnum::CREATE_SECTION->value,
      PermissionEnum::RENAME_SECTION->value,
      PermissionEnum::REMOVE_SECTION->value,
      PermissionEnum::ASSIGN_DUE_DATES->value,
      PermissionEnum::CREATE_TASK->value,
      PermissionEnum::RENAME_TASK->value,
      PermissionEnum::DELETE_TASK->value,
      PermissionEnum::ASSIGN_TASK->value,
      PermissionEnum::SET_TASK_AS_COMPLETED->value,
      PermissionEnum::MOVE_TASK->value,
      PermissionEnum::UPLOAD_FILE->value,
      PermissionEnum::DOWNLOAD_FILE->value,
      PermissionEnum::DELETE_FILE->value,
      PermissionEnum::RENAME_FILE->value,
    ]);

    $member = Role::find(RoleEnum::MEMBER)->permissions();
    $member->sync([
      PermissionEnum::LEAVE_PROJECT->value,
      PermissionEnum::SET_TASK_AS_COMPLETED->value,
      PermissionEnum::MOVE_TASK->value,
      PermissionEnum::DOWNLOAD_FILE->value
    ]);
  }
}
