<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectMessageResource extends JsonResource
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
      'member' => new MemberResource($this->whenLoaded('member')),
      'message' => $this->message,
      'threadCount' => $this->when(isset($this->thread_count), $this->thread_count),
      'thread' => ProjectMessageThreadResource::collection($this->whenLoaded('thread')),
      'created_at' => $this->created_at
    ];
  }
}
