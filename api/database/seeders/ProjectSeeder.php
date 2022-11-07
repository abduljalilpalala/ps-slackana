<?php

namespace Database\Seeders;

use App\Enums\ProjectStatusEnum;
use App\Enums\RoleEnum;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Section;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
      'email' => 'john@gmail.com',
      'name' => 'John Doe',
      'password' => bcrypt('password')
    ]);

    $janeDoe = User::updateOrCreate([
      'email' => 'jane@gmail.com'
    ], [
      'email' => 'jane@gmail.com',
      'name' => 'Jane Doe',
      'password' => bcrypt('password')
    ]);

    DB::beginTransaction();

    try {
      $project = Project::updateOrCreate([
        'title' => 'Slackana'
      ], [
        'title' => 'Slackana',
        'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam neque, ut dicta voluptate mollitia quo nam, perspiciatis aspernatur, sint nihil facilis ab quas molestiae culpa officiis quis aliquam quidem commodi!',
        'status_id' => ProjectStatusEnum::ON_TRACK,
      ]);

      Team::updateOrCreate(
        ['project_id' => $project->id, 'name' => 'Front End'],
        ['name' => 'Front Endasdsd']
      );

      Team::updateOrCreate(
        ['project_id' => $project->id, 'name' => 'Back End'],
        ['name' => 'Back End']
      );

      Team::updateOrCreate(
        ['project_id' => $project->id, 'name' => 'QA'],
        ['name' => 'QA']
      );

      ProjectMember::upsert([
        ['id' => 1, 'project_id' => $project->id, 'user_id' => $johnDoe->id, 'role_id' => RoleEnum::PROJECT_OWNER],
        ['id' => 2, 'project_id' => $project->id, 'user_id' => $janeDoe->id, 'role_id' => RoleEnum::MEMBER],
      ], ['id'], ['user_id', 'role_id']);

      Section::upsert([
        ['id' => 1, 'project_id' => $project->id, 'name' => 'To Do'],
        ['id' => 2, 'project_id' => $project->id, 'name' => 'In Progress'],
        ['id' => 3, 'project_id' => $project->id, 'name' => 'For Review'],
      ], ['id'], ['name']);

      // John Doe
      ProjectMember::where('user_id', $johnDoe->id)->firstOrFail()->teams()->sync([1, 2, 3]);

      // Jane Doe
      ProjectMember::where('user_id', $janeDoe->id)->firstOrFail()->teams()->sync([1, 2]);
      DB::commit();
    } catch (\Throwable $e) {
      DB::rollBack();
      abort(500, $e->getMessage());
    }
  }
}
