<?php

namespace App\Http\Resources;

use App\Utils\Permission;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'description' => $this->description,
      'repository' => $this->repository,
      'icon' => new AvatarResource($this->whenLoaded('icon')),
      'status' => new ProjectStatusResource($this->whenLoaded('status')),
      'teams' => TeamResource::collection($this->whenLoaded('teams')),
      'members' => MemberResource::collection($this->whenLoaded('members')),
      'can' => Permission::permissions($this->pivot->role_id),
      'numberOfActiveMembers' => $this->when(isset($this->members_count), $this->members_count),
      'role' => $this->pivot->role_id,
      'isArchived' => $this->is_archived,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at
    ];
  }
}
