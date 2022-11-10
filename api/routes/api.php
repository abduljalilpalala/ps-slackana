<?php

use App\Http\Controllers\ArchiveProjectController;
use App\Http\Controllers\ProjectMemberStatusController;
use App\Http\Controllers\UpdateUserSettingsController;
use App\Http\Controllers\ChangeUserPasswordController;
use App\Http\Controllers\CompleteTaskController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotificationSeenController;
use App\Http\Controllers\NudgeMemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectFileController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\ProjectMessageController;
use App\Http\Controllers\ProjectMessageThreadController;
use App\Http\Controllers\ProjectRepositoryController;
use App\Http\Controllers\ProjectSettingController;
use App\Http\Controllers\ProjectStatusController;
use App\Http\Controllers\ProjectTeamController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskDetailsController;
use App\Http\Controllers\TaskAssignmentController;
use App\Http\Controllers\TaskDueDateController;
use App\Http\Controllers\TaskPositionController;
use App\Http\Controllers\TaskReorderController;
use App\Http\Controllers\TaskSectionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::githubWebhooks('github-webhooks');
Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::apiResource('project', ProjectController::class);
  Route::apiResource('project.team', ProjectTeamController::class);
  Route::apiResource('project.member', ProjectMemberController::class);
  Route::apiResource('project.section', SectionController::class);
  Route::apiResource('project.section.task', TaskController::class);
  Route::apiResource('project.file', ProjectFileController::class);
  Route::apiResource('notification', NotificationController::class);
  Route::apiResource('project.message', ProjectMessageController::class);

  Route::group(['prefix' => 'ini'], function () {
    Route::get('/', function () {
      return ['upload_max_filesize' => ini_get('upload_max_filesize'), 'max_file_uploads' => ini_get('max_file_uploads')];
    });
  });


  Route::group(['prefix' => 'project'], function () {
    Route::put('/{project}/change-settings', [ProjectSettingController::class, 'update']);
    Route::put('/{project}/repository', [ProjectRepositoryController::class, 'update']);
    Route::put('/{project}/project-status', [ProjectStatusController::class, 'update']);
    Route::delete('/{project}/archive', [ArchiveProjectController::class, 'destroy']);
    Route::put('/{project}/un-archive', [ArchiveProjectController::class, 'update']);
    Route::delete('/{project}/leave', [ProjectMemberStatusController::class, 'destroy']);
    Route::post('/{project}/team-lead', [ProjectMemberStatusController::class, 'store']);
    Route::put('/{project}/mvp', [ProjectMemberStatusController::class, 'update']);
    Route::put('/{project}/task/{task}/details', [TaskDetailsController::class, 'update']);
    Route::get('/{project}/task/{task}/details', [TaskDetailsController::class, 'show']);
    Route::put('/{project}/task/{task}/complete', [CompleteTaskController::class, 'update']);
    Route::put('/{project}/task/{task}/due-date', [TaskDueDateController::class, 'update']);
    Route::put('/{project}/task/{task}/assign', [TaskAssignmentController::class, 'update']);
    Route::put('/{project}/section/{section}/reorder-tasks', [TaskReorderController::class, 'update']);
    Route::get('/{project}/member/{member}/nudge-member', [NudgeMemberController::class, 'show']);
    Route::put('/{project}/task/position', [TaskPositionController::class, 'update']);
    Route::put('/{project}/task/{task}/move-section', [TaskSectionController::class, 'update']);
    Route::put('/notification/seen', [NotificationSeenController::class, 'update']);
    Route::apiResource('/message.thread', ProjectMessageThreadController::class)->except(['show']);
  });

  Route::group(['prefix' => 'user'], function () {
    Route::put('change-password', [ChangeUserPasswordController::class, 'update']);
    Route::apiResource('setting', UpdateUserSettingsController::class)->only(['store', 'update']);
    Route::put('change-details', [UserController::class, 'update']);
    Route::get('/', [UserController::class, 'index']);
  });
});

require __DIR__ . '/auth.php';
