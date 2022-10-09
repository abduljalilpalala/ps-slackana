<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model implements HasMedia
{
  use HasFactory, InteractsWithMedia;
  protected $guarded = [];

  public function icon()
  {
    return $this->media()->where('collection_name', 'team-icon');
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('team-icon')->singleFile();
  }

  public function members()
  {
    return $this->belongsToMany(ProjectMember::class, 'member_teams');
  }

  public static function boot()
  {
    parent::boot();

    self::created(function (Team $team) {
      $team->addMedia(public_path('assets/team-icons/team-' . rand(1, 9) . '.png'))
        ->preservingOriginal()->toMediaCollection('team-icon', 'public');
    });
  }
}
