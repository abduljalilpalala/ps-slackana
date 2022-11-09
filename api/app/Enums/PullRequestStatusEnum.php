<?php

namespace App\Enums;

enum PullRequestStatusEnum: int
{
  case CLOSED = 1;

  public function toString()
  {
    return match ($this) {
      self::CLOSED => 'closed',
    };
  }
}
