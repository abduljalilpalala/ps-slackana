<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
  public function index()
  {
    if (request('search')) {
      return UserResource::collection(User::with('avatar')->where('name', 'like', '%'.request('search').'%')->get());
    }
    
    return UserResource::collection(User::with('avatar')->get());
  }
  public function update(UpdateUserRequest $request)
  {
    auth()->user()->update($request->validated());
    return response()->noContent();
  }
}
