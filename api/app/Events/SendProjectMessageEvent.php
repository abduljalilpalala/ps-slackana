<?php

namespace App\Events;

use App\Http\Resources\ProjectMessageResource;
use App\Models\Project;
use App\Models\ProjectMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendProjectMessageEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $result;
  public $project;
  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct(Project $project)
  {
    $this->result = ProjectMessageResource::collection(Project::find($project->id)->messages()->withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->orderBy('created_at', 'ASC')->get());
    $this->project = $project;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new Channel('project.' . $this->project->id . '.chat');
  }

  public function broadcastAs()
  {
    return 'SendProjectMessage';
  }

  public function broadcastWith()
  {
    return [
      'result' => $this->result
    ];
  }
}
