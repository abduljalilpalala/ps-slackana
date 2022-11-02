<?php

namespace App\Notifications;

use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AssignTaskNotification extends Notification
{
  use Queueable;

  protected $assigner;
  protected $task;
  protected $projectID;
  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct($assignerID, $taskID, $projectID)
  {
    $task = new TaskResource(Task::with('project_member.user')->findOrFail($taskID));
    $assigner = new UserResource(User::with('avatar')->findOrFail($assignerID));
    $this->assigner = $assigner;
    $this->projectID = $projectID;
    $this->task = $task;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @param  mixed  $notifiable
   * @return array
   */
  public function via($notifiable)
  {
    return ['database'];
  }

  /**
   * Get the array representation of the notification.
   *
   * @param  mixed  $notifiable
   * @return array
   */
  public function toArray($notifiable)
  {
    return [
      'type' => 'assignTask',
      'assigner' => $this->assigner,
      'task' => $this->task,
      'project_id' => $this->projectID
    ];
  }
}
