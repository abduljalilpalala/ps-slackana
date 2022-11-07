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

  public function show(Project $project, ProjectMessage $message)
  {
    return new ProjectMessageResource(ProjectMessage::withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->findOrFail($message->id));
  }

  public function store(ProjectMessageRequest $request, Project $project)
  {
    $project->messages()->create([
      'project_member_id' => $project->user($request->member_id)->firstOrFail()->id,
      'message' => $request->message
    ]);
    return $this->returnData($project);
  }

  public function update(ProjectMessageRequest $request, Project $project, ProjectMessage $message)
  {
    $message->update(['message' => $request->message]);
    return $this->returnData($project);
  }

  public function destroy(Project $project, ProjectMessage $message)
  {
    $message->delete();
    return $this->returnData($project);
  }

  private function returnData(Project $project)
  {
    event(new SendProjectMessageEvent($project));
    return ProjectMessageResource::collection(Project::find($project->id)->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->get());
  }
}
