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
    Schema::create('project_message_threads', function (Blueprint $table) {
      $table->id();
      $table->foreignId('project_message_id')->constrained()->onDelete('cascade');
      $table->foreignId('project_member_id')->constrained()->onDelete('cascade');
      $table->text('message');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('project_message_threads');
  }
};
