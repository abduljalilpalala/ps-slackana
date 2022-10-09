<?php

namespace App\Http\Controllers;

use App\Enums\NotificationEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserAvatarRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UpdateUserSettingsController extends Controller
{
  public function update(Request $request, User $user)
  {
    auth()->user()->notificationSettings()->sync([NotificationEnum::TASK_REMINDER->value => ['status' => $request->status]]);
    return response()->noContent();
  }

  public function store(UpdateUserAvatarRequest $request)
  {
    if ($request->hasFile('avatar')) {
      auth()->user()->addMedia($request->file('avatar'))->toMediaCollection('avatar');
    }
    return response()->noContent();
  }
}
