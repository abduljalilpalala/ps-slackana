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
    Schema::create('member_teams', function (Blueprint $table) {
      $table->id();
      $table->foreignId('project_member_id')
        ->constrained('project_members')
        ->onDelete('cascade')
        ->onUpdate('cascade');
      $table->foreignId('team_id')
        ->constrained()
        ->onDelete('cascade')
        ->onUpdate('cascade');
      $table->timestamp('created_at')->useCurrent();
      $table->timestamp('updated_at')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('member_teams');
  }
};
