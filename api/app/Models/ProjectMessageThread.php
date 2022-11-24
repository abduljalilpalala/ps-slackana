<?php

namespace App\Models;

use App\Http\Resources\ProjectMessageThreadResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMessageThread extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function member()
    {
        return $this->belongsTo(ProjectMember::class, 'project_member_id');
    }

    public function message()
    {
        return $this->belongsTo(ProjectMessage::class, 'project_message_id');
    }

    static public function createThreadMessage(ProjectMessage $message, $request)
    {
        $thread = $message->thread()->create([
            'project_member_id' => Project::find($request->project)->user(auth()->user()->id)->firstOrFail()->id,
            'message' => $request->message
        ]);
        return ProjectMessageThread::with('member.user.avatar')->findOrFail($thread->id);
    }

    public function updateThreadMessage($request)
    {
        $this->update(['message' => $request->message]);
        return ProjectMessageThread::with('member.user.avatar')->findOrFail($this->id);
    }

    public function deleteThreadMessage()
    {
        $id = $this->id;
        $this->delete();
        return $id;
    }

    public function displayThreadMessage()
    {
        return new ProjectMessageThreadResource(ProjectMessageThread::with(['member.user.avatar'])->findOrFail($this->id));
    }
}
