<?php

namespace App\Jobs;

use App\Enums\MessageActionEnum;
use App\Enums\PullRequestStatusEnum;
use App\Events\GithubWebhookEvent;
use App\Events\SendProjectMessageEvent;
use App\Models\Project;
use App\Models\ProjectMessage;
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
    $message = [
      'type' => 'merge',
      'name' => $payload->pull_request->merged_by->login,
      'avatar' => $payload->pull_request->merged_by->avatar_url,
      'pr_title' => $payload->pull_request->title,
      'pr_url' => $payload->pull_request->html_url
    ];
    if ($payload->action === PullRequestStatusEnum::CLOSED->toString() && $payload->pull_request->merged) {
      $project = Project::repository($payload->repository->full_name)->first();
      if ($project) {
        $users = $project->members->pluck('user');
        $pr_details = [
          "title" => $payload->pull_request->title,
          "url" => $payload->pull_request->html_url
        ];
        $newMessage = ProjectMessage::createGithubMessage($project, ["message" => json_encode($message)]);
        Notification::send($users, new GithubMergeNotification($payload->pull_request->merged_by, $pr_details, $project->id));
        if (!$project->is_archived) {
          event(new GithubWebhookEvent($users, $project));
          event(new SendProjectMessageEvent($project, $newMessage, MessageActionEnum::ADD_MESSAGE));
        }
      }
    }
  }
}
