<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
  public function index(Request $request)
  {
    $notifications = auth()->user()->notifications;
    if (request('type') === 'unread') {
      $notifications = $notifications->filter(function ($notification) {
        return $notification->read_at === null;
      })->values();
    }
    if (request('project')) {
      $notifications = $notifications->filter(function ($notification) {
        return intval($notification->data['project_id']) === intval(request('project'));
      })->values();
    }
    return $notifications;
  }

  public function update(DatabaseNotification $notification, Request $request)
  {
    return $notification->markAsRead();
  }
}
