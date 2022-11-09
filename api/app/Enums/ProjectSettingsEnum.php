<?php

namespace App\Enums;

enum ProjectSettingsEnum: int
{
  case MUTE_NUDGE = 1;

  public function toString()
  {
    return match ($this) {
      self::MUTE_NUDGE => 'muteNudge',
    };
  }
}
