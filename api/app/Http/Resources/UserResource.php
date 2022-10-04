<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
      'name' => $this->name,
      'email' => $this->email,
      'avatar' => new AvatarResource($this->whenLoaded('avatar')),
      'projects' => ProjectResource::collection($this->whenLoaded('projects')),
      'isloggedIn' => $this->is_logged_in,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
