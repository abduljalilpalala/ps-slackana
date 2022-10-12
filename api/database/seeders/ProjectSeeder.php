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
    $johnDoe = User::create([
      'name' => 'John Doe',
      'email' => 'john@gmail.com',
      'password' => bcrypt('password')
    ]);
    $johnDoe->addMedia(public_path('assets/avatar/avatar-' . rand(1, 12) . '.png'))
      ->preservingOriginal()->toMediaCollection('avatar', 'public');

    $janeDoe = User::create([
      'name' => 'Jane Doe',
      'email' => 'jane@gmail.com',
      'password' => bcrypt('password')
    ]);
    $janeDoe->addMedia(public_path('assets/avatar/avatar-' . rand(1, 12) . '.png'))
      ->preservingOriginal()->toMediaCollection('avatar', 'public');

    $project = Project::create([
      'title' => 'Slackana',
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

    // Manual seeding for section and tasks
    // $sections=$project->sections()->createMany([
    //   ['name' => 'To do'],
    //   ['name' => 'In Progress'],
    //   ['name' => 'For Review'],
    //   ['name' => 'Completed'],
    // ]);
    
    // $sections->first()->tasks()->create([
    //   'project_member_id' => $members->first()->id,
    //   'name'=> "Set-up Section Model and Migrations",
    //   'description' => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam neque, ut dicta voluptate mollitia quo nam, perspiciatis aspernatur, sint nihil facilis ab quas molestiae culpa officiis quis aliquam quidem commodi!",
    //   'position'=>1,
    //   'due_date' => Carbon::now(),
    //   'estimated_time'=> 3,
    //   'actual_time_finished'=> 4,
    // ]);

    // Using factory - faker data (lorem ipsum)
    $sections = Section::factory(4)->create([
      'project_id' => $project->id
    ]);
    Task::factory(4)->create([
      'project_member_id' => $members->first()->id,
      'section_id' => $sections->first()->id
    ]);

    // John Doe
    ProjectMember::where('user_id', $johnDoe->id)->first()->teams()->sync([1, 2, 3]);
    // Jane Doe
    ProjectMember::where('user_id', $janeDoe->id)->first()->teams()->sync([1, 2]);
  }
}
