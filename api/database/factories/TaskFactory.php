<?php

namespace Database\Factories;

use App\Models\ProjectMember;
use App\Models\Section;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
          'section_id' => Section::factory(),
          'name' => $this->faker->sentence,
          'description' => $this->faker->paragraph,
          'is_completed' => false,
          'position' => $this->faker->randomDigit(),
          'due_date' => Carbon::now(),
          'estimated_time'=> $this->faker->randomDigit(),
          'actual_time_finished'=> $this->faker->randomDigit(),
        ];
    }
}
