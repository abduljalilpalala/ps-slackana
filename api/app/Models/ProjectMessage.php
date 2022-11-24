<?php

namespace App\Models;

use App\Http\Resources\ProjectMessageResource;
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

  public function thread()
  {
    return $this->hasMany(ProjectMessageThread::class, 'project_message_id');
  }

  static function createMessage(Project $project, $request)
  {
    return $project->messages()->create([
      'project_member_id' => $project->user(auth()->user()->id)->firstOrFail()->id,
      'message' => $request->message
    ]);
  }


  static function createGithubMessage(Project $project, $request)
  {
    return $project->messages()->create($request);
  }

  public function updateMessage($request)
  {
    $this->update(['message' => $request->message]);
    return $this;
  }

  public function deleteMessage()
  {
    $this->delete();
    return $this->id;
  }

  public function displayMessage()
  {
    return new ProjectMessageResource(ProjectMessage::withCount(['thread'])->with(['member.user.avatar'])->findOrFail($this->id));
  }

  public function displayMessageWithThread()
  {
    return new ProjectMessageResource(ProjectMessage::withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->findOrFail($this->id));
  }
}
