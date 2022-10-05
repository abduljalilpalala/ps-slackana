<?php

namespace App\Enums;

enum ProjectStatusEnum: int
{
  case ON_TRACK = 1;
  case AT_RISK = 2;
  case OFF_TRACK = 3;
  case ON_HOLD = 4;
  case COMPLETE = 5;

  public function toString() {
    return match($this) {
      self::ON_TRACK => 'On track',
      self::AT_RISK => 'At risk',
      self::OFF_TRACK => 'Off track',
      self::ON_HOLD => 'On hold',
      self::COMPLETE => 'Complete'
    };
  }
}
