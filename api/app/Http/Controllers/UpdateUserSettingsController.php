<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserAvatarRequest;
use Illuminate\Http\Request;

class UpdateUserSettingsController extends Controller
{
  public function store(Request $request)
  {
    auth()->user()->notificationSettings()->update([
      'status' => $request->status
    ]);
    return response()->noContent();
  }

  public function update(UpdateUserAvatarRequest $request)
  {
    if ($request->hasFile('avatar')) {
      auth()->user()->addMedia($request->file('avatar'))->toMediaCollection('avatar');
    }
    return response()->noContent();
  }
}
