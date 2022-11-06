<?php

namespace App\Http\Controllers;

use App\Events\SendProjectMessageEvent;
use App\Models\Project;
use App\Models\ProjectMessage;
use App\Http\Requests\ProjectMessageRequest;
use App\Http\Resources\ProjectMessageResource;

class ProjectMessageController extends Controller
{
  public function index(Project $project)
  {
    return ProjectMessageResource::collection($project->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->get());
  }

  public function store(ProjectMessageRequest $request, Project $project)
  {
    $newMessage = $project->messages()->create([
      'project_member_id' => $request->member_id,
      'message' => $request->message
    ]);
    event(new SendProjectMessageEvent($newMessage, $project));
    return ProjectMessageResource::collection(Project::find($project->id)->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->get());
  }

  public function update(ProjectMessageRequest $request, Project $project, ProjectMessage $message)
  {
    $message->update(['message' => $request->message]);
    return ProjectMessageResource::collection(Project::find($project->id)->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->get());
  }

  public function destroy(Project $project, ProjectMessage $message)
  {
    $message->delete();
    return ProjectMessageResource::collection(Project::find($project->id)->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->get());
  }
}
