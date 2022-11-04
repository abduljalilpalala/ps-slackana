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
      $table->dropForeign('project_messages_user_id_foreign');
      $table->dropColumn('user_id');
      $table->foreignId('project_member_id')->constrained()->onDelete('cascade');
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
      $table->dropForeign('project_messages_project_member_id_foreign');
      $table->dropColumn('project_member_id');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
    });
  }
};
