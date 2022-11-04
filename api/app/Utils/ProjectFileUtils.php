<?php

namespace App\Utils;

/**
 * Class ProjectFileUtils
 * @package App\Utils
 */

class ProjectFileUtils
{
  public function addSuffixToFileName($file_name, $mediaItems)
  {
    $file_name_parts = explode('.', $file_name);
    $file_name = $file_name_parts[0] . ' (' . $mediaItems->count() . ')' . '.' . $file_name_parts[1];

    return $file_name;
  }
}
