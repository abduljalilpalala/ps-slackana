<?php
namespace App\Http\Traits;

use App\Enums\RoleEnum;

trait CheckProjectRole {
    public function hasRole($project) {
      return count($project->role()->get()) !== 0;
    }

    public function isProjectOwner($project) {
      if($this->hasRole($project)){
        return $project->role->role->id === RoleEnum::PROJECT_OWNER->value;
      }
      return false;
    }

    public function isTeamLeader($project) {
      if($this->hasRole($project)){
        return $project->role->role->id === RoleEnum::TEAM_LEADER->value;
      }
      return false;
    }

    public function isMember($project) {
      if($this->hasRole($project)){
        return $project->role->role->id === RoleEnum::MEMBER->value;
      }
      return false;
    }

    public function unauthorizedAccess(){
      return response()->json([
        'message' => 'You are not authorize for this action.'
      ], 401);
    }
}
