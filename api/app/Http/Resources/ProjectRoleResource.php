<?php

namespace App\Http\Resources;

use App\Models\Role;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectRoleResource extends JsonResource
{
  
  public function toArray($request)
  {
    return [
      'permissions' => PermissionResource::collection(Role::find($this->role_id)->permissions)
    ];
  }
}
