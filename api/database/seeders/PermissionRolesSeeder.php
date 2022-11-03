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
      ['permission_id' => PermissionEnum::ADD_MEMBER],
      ['permission_id' => PermissionEnum::REMOVE_MEMBER],
      ['permission_id' => PermissionEnum::NUDGE_MEMBER],
      ['permission_id' => PermissionEnum::ASSIGN_TEAM_LEADER],
      ['permission_id' => PermissionEnum::SET_MVP],
      ['permission_id' => PermissionEnum::SET_PROJECT_STATUS],
      ['permission_id' => PermissionEnum::ARCHIVE_PROJECT],
      ['permission_id' => PermissionEnum::EDIT_PROJECT],
      ['permission_id' => PermissionEnum::ADD_TEAM],
      ['permission_id' => PermissionEnum::EDIT_TEAM],
      ['permission_id' => PermissionEnum::REMOVE_TEAM],
      ['permission_id' => PermissionEnum::CREATE_SECTION],
      ['permission_id' => PermissionEnum::RENAME_SECTION],
      ['permission_id' => PermissionEnum::REMOVE_SECTION],
      ['permission_id' => PermissionEnum::ASSIGN_DUE_DATES],
      ['permission_id' => PermissionEnum::CREATE_TASK],
      ['permission_id' => PermissionEnum::RENAME_TASK],
      ['permission_id' => PermissionEnum::DELETE_TASK],
      ['permission_id' => PermissionEnum::ASSIGN_TASK],
      ['permission_id' => PermissionEnum::SET_TASK_AS_COMPLETED],
      ['permission_id' => PermissionEnum::MOVE_TASK],
      ['permission_id' => PermissionEnum::UPLOAD_FILE],
      ['permission_id' => PermissionEnum::DOWNLOAD_FILE],
      ['permission_id' => PermissionEnum::DELETE_FILE],
      ['permission_id' => PermissionEnum::RENAME_FILE],
    ]);

    $teamLeader = Role::find(RoleEnum::TEAM_LEADER)->permissions();
    $teamLeader->sync([
      ['permission_id' => PermissionEnum::ADD_MEMBER],
      ['permission_id' => PermissionEnum::REMOVE_MEMBER],
      ['permission_id' => PermissionEnum::NUDGE_MEMBER],
      ['permission_id' => PermissionEnum::LEAVE_PROJECT],
      ['permission_id' => PermissionEnum::SET_MVP],
      ['permission_id' => PermissionEnum::SET_PROJECT_STATUS],
      ['permission_id' => PermissionEnum::ARCHIVE_PROJECT],
      ['permission_id' => PermissionEnum::CREATE_SECTION],
      ['permission_id' => PermissionEnum::RENAME_SECTION],
      ['permission_id' => PermissionEnum::REMOVE_SECTION],
      ['permission_id' => PermissionEnum::ASSIGN_DUE_DATES],
      ['permission_id' => PermissionEnum::CREATE_TASK],
      ['permission_id' => PermissionEnum::RENAME_TASK],
      ['permission_id' => PermissionEnum::DELETE_TASK],
      ['permission_id' => PermissionEnum::ASSIGN_TASK],
      ['permission_id' => PermissionEnum::SET_TASK_AS_COMPLETED],
      ['permission_id' => PermissionEnum::MOVE_TASK],
      ['permission_id' => PermissionEnum::UPLOAD_FILE],
      ['permission_id' => PermissionEnum::DOWNLOAD_FILE],
      ['permission_id' => PermissionEnum::DELETE_FILE],
      ['permission_id' => PermissionEnum::RENAME_FILE],
    ]);

    $member = Role::find(RoleEnum::MEMBER)->permissions();
    $member->sync([
      ['permission_id' => PermissionEnum::LEAVE_PROJECT],
      ['permission_id' => PermissionEnum::SET_TASK_AS_COMPLETED],
      ['permission_id' => PermissionEnum::MOVE_TASK],
      ['permission_id' => PermissionEnum::DOWNLOAD_FILE]
    ]);
  }
}
