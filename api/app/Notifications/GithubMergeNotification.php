<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GithubMergeNotification extends Notification
{
  use Queueable;

  protected $pr_details;
  protected $merged_by;
  protected $projectID;

  public function __construct($merged_by, $pr_details,  $projectID)
  {
    $this->pr_details = $pr_details;
    $this->projectID = $projectID;
    $this->merged_by = $merged_by;
  }

  public function via($notifiable)
  {
    return ['database'];
  }

  public function toArray($notifiable)
  {
    return [
      'type' => 'merge',
      'merged_by' => $this->merged_by,
      'pr_details' => $this->pr_details,
      'project_id' => $this->projectID
    ];
  }
}
