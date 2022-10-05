<?php

namespace App\Http\Controllers;

use App\Enums\ArchiveStatusEnum;
use App\Models\Project;
use Illuminate\Http\Request;

class ArchiveProjectController extends Controller
{
  public function update(Request $request, Project $project)
  {
    // TODO: Un-archive
    $project->update([
      'is_archived' => ArchiveStatusEnum::UN_ARCHIVE->value
    ]);
    return response()->noContent();
  }

  public function destroy(Project $project)
  {
    // TODO: Archive
    $project->update([
      'is_archived' => ArchiveStatusEnum::ARCHIVE->value
    ]);
    return response()->noContent();
  }
}
