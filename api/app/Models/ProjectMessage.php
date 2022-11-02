<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMessage extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function member()
  {
    return $this->belongsTo(ProjectMember::class, 'project_member_id');
  }

  public function project()
  {
    return $this->belongsTo(Project::class);
  }
}
