<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
  public function index()
  {
    $memberIds = function ($query) {
      $query->select('user_id')
        ->from('project_members')
        ->where('project_members.project_id', request('projectId'))
        ->where('project_members.is_removed', 0)->get();
    };

    if (request('search')) {
      return UserResource::collection(User::with(['avatar'])->where('name', 'like', '%' . request('search') . '%')->whereNotIn('id', $memberIds)->get());
    }

    return UserResource::collection(User::with(['avatar'])->whereNotIn('id', $memberIds)->get());
  }
  public function update(UpdateUserRequest $request)
  {
    auth()->user()->update($request->validated());
    return response()->noContent();
  }
}
