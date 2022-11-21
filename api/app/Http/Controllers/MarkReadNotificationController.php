<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class MarkReadNotificationController extends Controller
{
    public function __invoke(Project $project)
    {
        auth()->user()->unreadNotifications()->whereJsonContains('data->project_id', $project->id)->update(['read_at' => now()]);
        return response()->noContent();
    }
}
