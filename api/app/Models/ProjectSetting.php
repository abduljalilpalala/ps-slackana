<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectSetting extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function scopeProject($query, $id)
  {
    return $query->where('project_id', $id);
  }

  public function scopeGetSetting($query, $setting)
  {
    return $query->where('setting', $setting);
  }
}
