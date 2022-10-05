<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'user' => new UserResource($this->whenLoaded('user')),
      'role' => new RoleResource($this->whenLoaded('role')),
      'teams' => TeamResource::collection($this->whenLoaded('teams')),
      'is_removed' => $this->is_removed,
      'is_mvp' => $this->is_mvp,
      'date_joined' => $this->created_at
    ];
  }
}
