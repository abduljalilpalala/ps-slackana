<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
  public function index()
  {
    return ProjectResource::collection(User::find(auth()->user()->id)->projects()->with(['icon', 'status'])->get());
  }

  public function show(Project $project)
  {
    return new ProjectResource(User::find(auth()->user()->id)->projects()->with([
      'icon', 'role', 'status', 'teams', 'members.user.avatar', 'members.role', 'members.teams'
    ])->where('project_id', $project->id)->first());
  }
}
