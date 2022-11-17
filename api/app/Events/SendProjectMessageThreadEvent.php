<?php

namespace App\Events;

use App\Enums\MessageActionEnum;
use App\Http\Resources\ProjectMessageResource;
use App\Http\Resources\ProjectMessageThreadResource;
use App\Models\ProjectMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendProjectMessageThreadEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $threadMessage;
  public $updatedMessage;
  public $actionType;
  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($threadMessage, $updatedMessage, MessageActionEnum $actionType)
  {
    $this->actionType = $actionType;
    $this->updatedMessage = new ProjectMessageResource(ProjectMessage::withCount(['thread'])->with(['member.user.avatar', 'thread.member.user.avatar'])->findOrFail($updatedMessage->id));
    if ($actionType !== MessageActionEnum::DELETE_MESSAGE) {
      $this->threadMessage = new ProjectMessageThreadResource($threadMessage);
    } else {
      $this->threadMessage = $threadMessage;
    }
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new Channel('chat.' . $this->updatedMessage->id . '.thread');
  }

  public function broadcastAs()
  {
    return 'SendProjectMessageThread';
  }

  public function broadcastWith()
  {
    return [
      'threadMessage' => $this->threadMessage,
      'message' => $this->updatedMessage,
      'type' => $this->actionType
    ];
  }
}
