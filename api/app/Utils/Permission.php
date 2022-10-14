<?php

namespace App\Utils;

use App\Models\Role;

class Permission
{
  static public function permissions($roleId)
  {
    return collect(Role::find($roleId)->permissions)->mapWithKeys(function ($item, $key) {
      return [$item['name'] => true];
    });
  }
}
