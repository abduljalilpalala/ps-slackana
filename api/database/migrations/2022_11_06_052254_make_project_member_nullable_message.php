<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('project_messages', function (Blueprint $table) {
      $table->foreignId('project_member_id')->nullable()->change();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('project_messages', function (Blueprint $table) {
      $table->foreignId('project_member_id')->nullable()->change();
    });
  }
};
