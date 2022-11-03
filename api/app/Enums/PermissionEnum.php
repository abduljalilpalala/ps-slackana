<?php

namespace App\Enums;

enum PermissionEnum: int
{
  case ADD_MEMBER = 1;
  case REMOVE_MEMBER = 2;
  case NUDGE_MEMBER = 3;
  case LEAVE_PROJECT = 4;
  case ASSIGN_TEAM_LEADER = 5;
  case SET_MVP = 6;
  case SET_PROJECT_STATUS = 7;
  case ARCHIVE_PROJECT = 8;
  case EDIT_PROJECT = 9;
  case ADD_TEAM = 10;
  case EDIT_TEAM = 11;
  case REMOVE_TEAM = 12;
  case CREATE_SECTION = 13;
  case RENAME_SECTION = 14;
  case REMOVE_SECTION = 15;
  case ASSIGN_DUE_DATES = 16;
  case CREATE_TASK = 17;
  case RENAME_TASK = 18;
  case DELETE_TASK = 19;
  case ASSIGN_TASK = 20;
  case SET_TASK_AS_COMPLETED = 21;
  case MOVE_TASK = 22;
  case UPLOAD_FILE = 23;
  case DELETE_FILE = 24;
  case DOWNLOAD_FILE = 25;
  case RENAME_FILE = 26;

  public function toString()
  {
    return match ($this) {
      self::ADD_MEMBER => 'addMember',
      self::REMOVE_MEMBER => 'removeMember',
      self::NUDGE_MEMBER => 'nudgeMember',
      self::LEAVE_PROJECT => 'leaveProject',
      self::ASSIGN_TEAM_LEADER => 'assignTeamLeader',
      self::SET_MVP => 'setMVP',
      self::SET_PROJECT_STATUS => 'setProjectStatus',
      self::ARCHIVE_PROJECT => 'archiveProject',
      self::EDIT_PROJECT => 'editProject',
      self::ADD_TEAM => 'addTeam',
      self::EDIT_TEAM => 'editTeam',
      self::REMOVE_TEAM => 'removeTeam',
      self::CREATE_SECTION => 'createSection',
      self::RENAME_SECTION => 'renameSection',
      self::REMOVE_SECTION => 'removeSection',
      self::ASSIGN_DUE_DATES => 'assignDueDates',
      self::CREATE_TASK => 'createTask',
      self::RENAME_TASK => 'renameTask',
      self::DELETE_TASK => 'deleteTask',
      self::ASSIGN_TASK => 'assignTask',
      self::SET_TASK_AS_COMPLETED => 'setTaskAsCompleted',
      self::MOVE_TASK => 'moveTask',
      self::UPLOAD_FILE => 'uploadFile',
      self::DELETE_FILE => 'deleteFile',
      self::DOWNLOAD_FILE => 'downloadFile',
      self::RENAME_FILE => 'renameFile'
    };
  }
}
