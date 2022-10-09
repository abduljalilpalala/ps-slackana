<?php
namespace App\Http\Traits;

use App\Enums\RoleEnum;

trait CheckProjectRole {
    public function hasRole($project) {
      return count($project->role()->get())!=0?true:false;
    }

    public function isProjectOwner($project) {
      if($this->hasRole($project)){
        return $project->role->role->name==RoleEnum::PROJECT_OWNER->toString()?true:false;
      }
      return false;
    }

    public function isTeamLeader($project) {
      if($this->hasRole($project)){
        return $project->role->role->name==RoleEnum::TEAM_LEADER->toString()?true:false;
      }
      return false;
    }

    public function isMember($project) {
      if($this->hasRole($project)){
        return $project->role->role->name==RoleEnum::MEMBER->toString()?true:false;
      }
      return false;
    }

    public function unauthorizedAccess(){
      return response()->json([
        'message' => 'You are not authorize for this action.'
      ], 401);
    }
}