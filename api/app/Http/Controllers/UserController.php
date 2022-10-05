<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
  public function update(UpdateUserRequest $request)
  {
    auth()->user()->update($request->validated());
    return response()->noContent();
  }
}
