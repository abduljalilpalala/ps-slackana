<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function index(Request $request)
  {
    return new UserResource(User::with(['avatar'])
    ->findOrFail($request->user()->id));
  }
  
  public function store(SignInRequest $request)
  {
    $request->authenticate();
    $user = User::where('email', $request->email)->first();
    $user->update(['is_logged_in' => 1]);
    $token = $user->createToken('access-token')->plainTextToken;

    return response()->json([
      'token' => $token
    ]);
  }

  public function destroy()
  {
    auth()->user()->currentAccessToken()->delete();
    return response()->noContent();
  }
}
