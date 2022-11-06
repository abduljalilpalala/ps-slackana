<?php

namespace App\Events;

use App\Http\Resources\ProjectMessageResource;
use App\Http\Resources\ProjectMessageThreadResource;
use App\Models\Project;
use App\Models\ProjectMessage;
use App\Models\ProjectMessageThread;
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

  public $newThreadMessages;
  public $updatedMessage;
  public $id;
  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($newThreadMessages, $updatedMessage, $id)
  {
    $this->newThreadMessages = $newThreadMessages;
    $this->updatedMessage = $updatedMessage;
    $this->id = $id;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new Channel('chat.' . $this->id . '.thread');
  }

  public function broadcastAs()
  {
    return 'SendProjectMessageThread';
  }

  public function broadcastWith()
  {
    return [
      'newThreadMessages' => $this->newThreadMessages,
      'message' => $this->updatedMessage
    ];
  }
}
