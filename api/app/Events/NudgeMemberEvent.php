<?php

namespace App\Events;

use App\Models\Project;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NudgeMemberEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $project;
  public $user;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct(Project $project, User $user)
  {
    $this->project = $project;
    $this->user = $user;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new Channel('project.' . $this->project->id . '.member.' . $this->user->id);
  }

  public function broadcastWith()
  {
    return [
      'userName' => auth()->user()->name,
    ];
  }
}
