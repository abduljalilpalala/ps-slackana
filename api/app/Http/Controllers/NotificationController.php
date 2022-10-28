<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
  public function index(Request $request)
  {
    return auth()->user()->notifications;
  }

  public function update(DatabaseNotification $notification, Request $request)
  {
    return $notification->markAsRead();
  }
}
