<?php

namespace App\Enums;

enum ArchiveStatusEnum: int
{
  case ARCHIVE = 1;
  case UN_ARCHIVE = 0;

  public function toString() {
    return match($this) {
      self::ARCHIVE => 'Archive',
      self::UN_ARCHIVE => 'Unarchive',
    };
  }
}
