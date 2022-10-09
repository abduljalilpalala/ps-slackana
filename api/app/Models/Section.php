<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function project()
    {
      return $this->belongsTo(Project::class);
    }

    public function tasks()
    {
      return $this->hasMany(Task::class);
    }
}
