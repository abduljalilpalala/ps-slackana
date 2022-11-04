<?php

namespace App\Utils;

/**
 * Class ProjectFileUtils
 * @package App\Utils
 */

class ProjectFileUtils
{
  public function addSuffixToName($name, $project)
  {
    $mediaItems = $project->getMedia('project-files');
    $count = $mediaItems->filter(function ($item) use ($name) {
      return str_contains($item->name, $name);
    })->count();
    $name = $name . ' (' . $count . ')';
    return $name;
  }
}
