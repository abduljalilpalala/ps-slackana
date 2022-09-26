<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;

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
    $user->addMedia(public_path('assets\avatar\avatar-'.rand(1,12).'.png'))
            ->preservingOriginal()->toMediaCollection('avatar', 'public');

    return response()->json([
      'token' => $token
    ]);
  }
}
