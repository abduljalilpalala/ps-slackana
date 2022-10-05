<?php

use App\Http\Controllers\ArchiveProjectController;
use App\Http\Controllers\ProjectMemberStatusController;
use App\Http\Controllers\UpdateUserSettingsController;
use App\Http\Controllers\ChangeUserPasswordController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\ProjectStatusController;
use App\Http\Controllers\ProjectTeamController;
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


Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::apiResource('project', ProjectController::class);
  Route::apiResource('project.team', ProjectTeamController::class);
  Route::apiResource('project.member', ProjectMemberController::class);
  
  Route::group(['prefix' => 'project'], function () {
    Route::put('/{project}/project-status', [ProjectStatusController::class, 'update']);
    Route::delete('/{project}/archive', [ArchiveProjectController::class, 'destroy']);
    Route::put('/{project}/un-archive', [ArchiveProjectController::class, 'update']);
    Route::delete('/{project}/leave', [ProjectMemberStatusController::class, 'destroy']);
  });

  Route::group(['prefix' => 'user'], function () {
    Route::put('change-password', [ChangeUserPasswordController::class, 'update']);
    Route::apiResource('setting', UpdateUserSettingsController::class)->only(['store', 'update']);
    Route::put('change-details', [UserController::class, 'update']);
    Route::get('/', [UserController::class, 'index']);
  });
});

require __DIR__ . '/auth.php';
