<?php

namespace App\Events;

use App\Enums\MessageActionEnum;
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
  public $actionType;
  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct(Project $project, $message, MessageActionEnum $actionType)
  {
    $this->project = $project;
    if ($actionType !== MessageActionEnum::DELETE_MESSAGE) {
      $this->result =  new ProjectMessageResource(ProjectMessage::withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->findOrFail($message->id));
    } else {
      $this->result = $message;
    }
    $this->actionType = $actionType;
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
      'data' => $this->result,
      'type' => $this->actionType,
    ];
  }
}
