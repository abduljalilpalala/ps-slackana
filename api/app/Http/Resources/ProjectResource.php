<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'title' => $this->title,
          'description' => $this->description,
          'icon' => new AvatarResource($this->whenLoaded('icon')),
          'status' => new ProjectStatusResource($this->whenLoaded('status')),
          'teams' => TeamResource::collection($this->whenLoaded('teams')),
          'members' => MemberResource::collection($this->whenLoaded('members')),
          'role' => new ProjectRoleResource($this->whenLoaded('role')),
          'isArchived' => $this->is_archived,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at
        ];
    }
}
