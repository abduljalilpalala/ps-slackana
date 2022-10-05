<?php

namespace App\Enums;

enum NotificationEnum: int
{
  case TASK_REMINDER = 1;

  public function toString() {
    return match($this) {
      self::TASK_REMINDER => 'Notifications for Task Reminder',
    };
  }
}
