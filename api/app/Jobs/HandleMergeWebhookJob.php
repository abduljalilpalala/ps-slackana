<?php

namespace App\Jobs;

use App\Events\GithubWebhookEvent;
use App\Models\Project;
use App\Notifications\GithubMergeNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;
use Spatie\GitHubWebhooks\Models\GitHubWebhookCall;

class HandleMergeWebhookJob implements ShouldQueue
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
    if ($payload->action === 'closed' && $payload->pull_request->merged === true) {
      $project = Project::with('members.user')->where('repository', $payload->repository->name)->first();
      if ($project) {
        $users = $project->members->pluck('user');
        $pr_details = [
          "title" => $payload->pull_request->title,
          "url" => $payload->pull_request->html_url
        ];
        Notification::send($users, new GithubMergeNotification($payload->pull_request->merged_by, $pr_details, $project->id));
        event(new GithubWebhookEvent($users, $project));
      }
    }
  }
}
