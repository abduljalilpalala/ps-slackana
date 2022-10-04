<?php

namespace App\Http\Controllers\Auth;

use App\Enums\NotificationEnum;
use App\Enums\UserStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use App\Http\Resources\UserResource;

class SignUpController extends Controller
{
  public function store(SignUpRequest $request)
  {
    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => bcrypt($request->password),
    ]);
    $token = $user->createToken('access-token')->plainTextToken;
    $user->update(['is_logged_in' => UserStatusEnum::SIGNED_IN]);
    $user->notificationSettings()->sync([NotificationEnum::TASK_REMINDER->value => ['status' => true]]);
    $user->addMedia(public_path('assets/avatar/avatar-' . rand(1, 12) . '.png'))
      ->preservingOriginal()->toMediaCollection('avatar', 'public');

    return response()->json([
      'user' => new UserResource(User::with(['avatar'])->findOrFail($user->id)),
      'token' => $token
    ]);
  }
}
