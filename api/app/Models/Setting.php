<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function notificationSettings()
  {
    return $this->belongsToMany(User::class, 'notification_settings')->withPivot(['status']);
  }
}
