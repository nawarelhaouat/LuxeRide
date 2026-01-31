<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('connexion', function (Blueprint $table) {
            $table->integer('id_connexion')->primary();
            $table->dateTime('date_connexion')->nullable();
            $table->string('adresse_ip', 50)->nullable();
            $table->string('id_admin', 50);

            // Clé étrangère vers ADMIN(id_admin)
            $table->foreign('id_admin')
                  ->references('id_admin')
                  ->on('admin')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connexion');
    }
};
