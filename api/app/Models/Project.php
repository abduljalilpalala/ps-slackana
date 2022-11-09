<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model implements HasMedia
{
  use HasFactory, InteractsWithMedia;

  protected $guarded = [];

  public function icon()
  {
    return $this->media()->where('collection_name', 'project-icon');
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('project-icon')->singleFile();
    if (env('FILESYSTEM_DISK') === 's3') {
      $this->addMediaCollection('project-files')->useDisk(env('FILESYSTEM_DISK'));
    } else {
      $this->addMediaCollection('project-files');
    }
  }

  public function teams()
  {
    return $this->hasMany(Team::class);
  }

  public function status()
  {
    return $this->belongsTo(ProjectStatus::class);
  }

  public function members()
  {
    return $this->hasMany(ProjectMember::class)->where('is_removed', 0);
  }

  public function role()
  {
    return $this->hasOne(ProjectMember::class)->where('user_id', auth()->user()->id);
  }

  public function sections()
  {
    return $this->hasMany(Section::class);
  }

  public function noOfActiveMembers()
  {
    return $this->members()->where('is_removed', 0)->count();
  }

  public function messages()
  {
    return $this->hasMany(ProjectMessage::class);
  }

  public static function boot()
  {
    parent::boot();

    self::created(function (Project $project) {
      $project->addMedia(public_path('assets/project-icons/project-icon-' . rand(1, 20) . '.png'))
        ->preservingOriginal()->toMediaCollection('project-icon', 'public');
    });
  }

  public function user(int $userId)
  {
    return $this->members()->where('user_id', $userId);
  }

  public function scopeRepository($query, $name)
  {
    return $query->where('repository', $name);
  }
}
