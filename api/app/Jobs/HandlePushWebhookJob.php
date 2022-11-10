<?php

namespace App\Jobs;

use App\Events\GithubWebhookEvent;
use App\Events\SendProjectMessageEvent;
use App\Models\Project;
use App\Models\ProjectMessage;
use App\Notifications\GithubPushNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;
use Spatie\GitHubWebhooks\Models\GitHubWebhookCall;

class HandlePushWebhookJob implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
  public GitHubWebhookCall $gitHubWebhookCall;
  public function __construct(
    public GitHubWebhookCall $webhookCall
  ) {
  }

  public function handle()
  {
    $payload = $this->webhookCall->payload();
    $payload = json_decode($payload['payload']);
    $commit = $payload->commits[count($payload->commits) - 1];
    $message = [
      'type' => 'commit',
      'name' => $payload->sender->login,
      'avatar' => $payload->sender->avatar_url,
      'repository' => $payload->repository->full_name,
      'commit_url' => $commit->url
    ];
    if ($commit->committer->username !== 'web-flow') {
      $project = Project::repository($payload->repository->full_name)->first();
      if ($project) {
        $users = $project->members->pluck('user');
        ProjectMessage::create([
          'project_id' => $project->id,
          'message' => json_encode($message)
        ]);
        Notification::send($users, new GithubPushNotification($payload->sender, $payload->repository, $commit, $project->id));
        if (!$project->is_archived) {
          event(new GithubWebhookEvent($users, $project));
          event(new SendProjectMessageEvent($project));
        }
      }
    }
  }
}
