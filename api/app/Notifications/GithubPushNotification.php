<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GithubPushNotification extends Notification
{
  use Queueable;

  protected $repository;
  protected $commit;
  protected $sender;
  protected $projectID;

  public function __construct($sender, $repository, $commit, $projectID)
  {
    $this->sender = $sender;
    $this->projectID = $projectID;
    $this->commit = $commit;
    $this->repository = $repository;
  }

  public function via($notifiable)
  {
    return ['database'];
  }

  public function toArray($notifiable)
  {
    return [
      'type' => 'commit',
      'sender' => $this->sender,
      'repository' => $this->repository,
      'commit' => $this->commit,
      'project_id' => $this->projectID
    ];
  }
}
