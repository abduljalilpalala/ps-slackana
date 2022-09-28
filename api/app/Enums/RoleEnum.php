<?php

namespace App\Enums;

enum RoleEnum: int
{
  case PROJECT_OWNER = 1;
  case TEAM_LEADER = 2;
  case MEMBER = 3;

  public function toString() {
    return match($this) {
      self::PROJECT_OWNER => 'Project Owner',
      self::TEAM_LEADER => 'Team Leader',
      self::MEMBER => 'Member'
    };
  }
}
