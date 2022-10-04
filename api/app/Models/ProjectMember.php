<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
  protected $guarded = [];

  public function role()
  {
    return $this->belongsTo(Role::class, 'role_id');
  }

  public function teams()
  {
    return $this->belongsToMany(Team::class, 'member_teams', 'project_member_id');
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
}
