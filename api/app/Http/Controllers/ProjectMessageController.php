<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMessage;
use App\Enums\MessageActionEnum;
use App\Events\SendProjectMessageEvent;
use App\Http\Requests\ProjectMessageRequest;
use App\Http\Resources\ProjectMessageResource;

class ProjectMessageController extends Controller
{
    public function index(Project $project)
    {
        return ProjectMessageResource::collection($project->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->oldest()->get());
    }

    public function show(Project $project, ProjectMessage $message)
    {
        return response()->json($message->displayMessage());
    }

    public function store(ProjectMessageRequest $request, Project $project)
    {
        $newMessage = ProjectMessage::createMessage($project, $request);
        event(new SendProjectMessageEvent($project, $newMessage, MessageActionEnum::ADD_MESSAGE));
        return response()->json($newMessage->displayMessage());
    }

    public function update(ProjectMessageRequest $request, Project $project, ProjectMessage $message)
    {
        event(new SendProjectMessageEvent($project, $message->updateMessage($request), MessageActionEnum::UPDATE_MESSAGE));
        return response()->json($message->displayMessage());
    }

    public function destroy(Project $project, ProjectMessage $message)
    {
        event(new SendProjectMessageEvent($project, $message->deleteMessage(), MessageActionEnum::DELETE_MESSAGE));
        return response()->json($message->id);
    }
}
