<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectMessageRequest;
use App\Http\Resources\ProjectMessageResource;
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
    $newMessage = $message->thread()->create([
      'project_member_id' => $request->member_id,
      'message' => $request->message
    ]);
    return new ProjectMessageResource($newMessage);
  }

  public function update(ProjectMessageRequest $request, ProjectMessage $message, ProjectMessageThread $thread)
  {
    $thread->update(['message' => $request->message]);
    return new ProjectMessageResource($thread);
  }

  public function destroy(ProjectMessage $message, ProjectMessageThread $thread)
  {
    $thread->delete();
    return new ProjectMessageResource($thread);
  }
}
