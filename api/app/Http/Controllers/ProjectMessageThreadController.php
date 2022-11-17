<?php

namespace App\Http\Controllers;

use App\Models\ProjectMessage;
use App\Enums\MessageActionEnum;
use App\Models\ProjectMessageThread;
use App\Events\SendProjectMessageThreadEvent;
use App\Http\Resources\ProjectMessageResource;
use App\Http\Requests\ProjectMessageThreadRequest;

class ProjectMessageThreadController extends Controller
{
    public function index(ProjectMessage $message)
    {
        return ProjectMessageResource::collection($message->thread()->with('member.user.avatar')->get());
    }

    public function store(ProjectMessageThreadRequest $request, ProjectMessage $message)
    {
        $newThread = ProjectMessageThread::createThreadMessage($message, $request);
        event(new SendProjectMessageThreadEvent($newThread, $message, MessageActionEnum::ADD_MESSAGE));
        return response()->json([
            'threadMessage' => $newThread->displayThreadMessage(),
            'message' => $message->displayMessage(),
        ]);
    }

    public function update(ProjectMessageThreadRequest $request, ProjectMessage $message, ProjectMessageThread $thread)
    {
        $newThread = $thread->updateThreadMessage($request);
        event(new SendProjectMessageThreadEvent($newThread, $message, MessageActionEnum::UPDATE_MESSAGE));
        return response()->json([
            'threadMessage' => $newThread->displayThreadMessage(),
            'message' => $message->displayMessage()
        ]);
    }

    public function destroy(ProjectMessage $message, ProjectMessageThread $thread)
    {
        event(new SendProjectMessageThreadEvent($thread->deleteThreadMessage(), $message, MessageActionEnum::DELETE_MESSAGE));
        return response()->json([
            'threadMessage' => $thread->id,
            'message' => $message->displayMessage()
        ]);
    }
}
