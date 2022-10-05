<?php

namespace App\Enums;

enum UserStatusEnum: int
{
  case SIGNED_IN = 1;
  case SIGNED_OUT = 0;

  public function toString() {
    return match($this) {
      self::SIGNED_IN => 'Signed In',
      self::SIGNED_OUT => 'Signed Out',
    };
  }
}
