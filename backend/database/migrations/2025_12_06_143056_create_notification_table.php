<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification', function (Blueprint $table) {

            $table->increments('id_notification'); // ✅ primary key + auto increment

            $table->string('message', 50)->nullable();
            $table->boolean('lu')->nullable();
            $table->string('titre', 50)->nullable();
            $table->string('id_admin', 50);

            // Foreign key → ADMIN(id_admin)
            $table->foreign('id_admin')
                  ->references('id_admin')
                  ->on('admin')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification');
    }
};
