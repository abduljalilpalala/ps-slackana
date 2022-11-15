<?php

namespace App\Http\Controllers;

use App\Events\SendProjectMessageThreadEvent;
use App\Http\Requests\ProjectMessageRequest;
use App\Http\Resources\ProjectMessageResource;
use App\Models\Project;
use App\Models\ProjectMessage;
use App\Models\ProjectMessageThread;

class ProjectMessageThreadController extends Controller
{
  public function index(ProjectMessage $message)
  {
    return ProjectMessageResource::collection($message->thread()->with('member.user.avatar')->get());
  }

  public function store(ProjectMessageRequest $request, ProjectMessage $message)
  {
    $message->thread()->create([
      'project_member_id' => Project::find($request->project_id)->user($request->member_id)->firstOrFail()->id,
      'message' => $request->message
    ]);

    return $this->returnData($message);
  }

  public function update(ProjectMessageRequest $request, ProjectMessage $message, ProjectMessageThread $thread)
  {
    $thread->update(['message' => $request->message]);
    return $this->returnData($message);
  }

  public function destroy(ProjectMessage $message, ProjectMessageThread $thread)
  {
    $thread->delete();
    return $this->returnData($message);
  }

  private function returnData(ProjectMessage $message)
  {
    $newThreadMessages = ProjectMessageResource::collection(ProjectMessage::findOrFail($message->id)->thread()->with('member.user.avatar')->get());

    $updatedMessage = new ProjectMessageResource(ProjectMessage::withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->findOrFail($message->id));

    // event(new SendProjectMessageThreadEvent($newThreadMessages, $updatedMessage, $message->id));

    return [
      'newThreadMessages' => $newThreadMessages,
      'message' => $updatedMessage
    ];
  }
}
