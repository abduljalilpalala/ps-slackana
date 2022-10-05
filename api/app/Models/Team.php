<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
  use HasFactory;
  protected $guarded = [];

  public function members()
  {
    return $this->belongsToMany(User::class, 'member_teams');
  }
}
