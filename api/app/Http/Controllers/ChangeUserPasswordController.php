<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeUserPasswordRequest;
use App\Models\User;

class ChangeUserPasswordController extends Controller
{
  public function update(ChangeUserPasswordRequest $request, User $user)
  {
    auth()->user()->update(['password' => bcrypt($request->newPassword)]);
    return response()->noContent();
  }
}
