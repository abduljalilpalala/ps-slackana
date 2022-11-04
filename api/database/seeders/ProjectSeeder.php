<?php

namespace Database\Seeders;

use App\Enums\ProjectStatusEnum;
use App\Enums\RoleEnum;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Section;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $johnDoe = User::updateOrCreate([
      'email' => 'john@gmail.com'
    ], [
      'name' => 'John Doe',
      'password' => bcrypt('password')
    ]);

    $johnDoe->addMedia(public_path('assets/avatar/avatar-' . rand(1, 12) . '.png'))
      ->preservingOriginal()->toMediaCollection('avatar', 'public');

    $janeDoe = User::updateOrCreate([
      'email' => 'jane@gmail.com'
    ], [
      'name' => 'Jane Doe',
      'password' => bcrypt('password')
    ]);

    $janeDoe->addMedia(public_path('assets/avatar/avatar-' . rand(1, 12) . '.png'))
      ->preservingOriginal()->toMediaCollection('avatar', 'public');

    $project = Project::updateOrCreate([
      'title' => 'Slackana',
    ], [
      'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam neque, ut dicta voluptate mollitia quo nam, perspiciatis aspernatur, sint nihil facilis ab quas molestiae culpa officiis quis aliquam quidem commodi!',
      'status_id' => ProjectStatusEnum::ON_TRACK,
    ]);

    $project->addMedia(public_path('assets/project-icons/project-icon-' . rand(1, 20) . '.png'))
      ->preservingOriginal()->toMediaCollection('project-icon', 'public');

    $project->teams()->createMany([
      ['name' => 'Front End'],
      ['name' => 'Back End'],
      ['name' => 'QA'],
    ]);
    $members = $project->members()->createMany([
      ['user_id' => $johnDoe->id, 'role_id' => RoleEnum::PROJECT_OWNER],
      ['user_id' => $janeDoe->id, 'role_id' => RoleEnum::MEMBER],
    ]);

    $project->sections()->createMany([
      ['name' => 'To Do'],
      ['name' => 'In Progress'],
      ['name' => 'For Review'],
    ]);

    // John Doe
    ProjectMember::where('user_id', $johnDoe->id)->first()->teams()->sync([1, 2, 3]);
    // Jane Doe
    ProjectMember::where('user_id', $janeDoe->id)->first()->teams()->sync([1, 2]);
  }
}
