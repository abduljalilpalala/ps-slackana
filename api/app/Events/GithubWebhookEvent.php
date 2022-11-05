<?php

namespace App\Events;

use App\Models\Project;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GithubWebhookEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public $project;
  public $users;
  public $channels = [];
  public function __construct($users, $project)
  {
    $this->project = $project;
    $this->users = $users;
    foreach ($users as $user) {
      $this->channels[] = new Channel('user.' . $user->id . '.notifications');
    }
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return $this->channels;
  }

  public function broadcastAs()
  {
    return 'NotificationEvent';
  }

  public function broadcastWith()
  {
    return [
      'project' => $this->project
    ];
  }
}
