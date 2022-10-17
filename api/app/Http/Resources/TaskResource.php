<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
        'section_id'=>$this->section_id,
        'assignee' => new MemberResource($this->whenLoaded('project_member')),
        'name' => $this->name,
        'description' => $this->description,
        'is_completed' => $this->is_completed,
        'position' => $this->position,
        'due_date' => $this->due_date,
        'estimated_time' => $this->estimated_time,
        'actual_time_finished' => $this->actual_time_finished,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
    }
}
