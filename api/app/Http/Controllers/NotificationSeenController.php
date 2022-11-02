<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationSeenController extends Controller
{
  public function update(Request $request)
  {
    auth()->user()->notifications()->update([
      'is_seen' => true
    ]);
    return response()->noContent();
  }
}
