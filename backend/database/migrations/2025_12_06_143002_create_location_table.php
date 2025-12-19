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

        Schema::create('location', function (Blueprint $table) {

            $table->integer('id_location')->primary();
            $table->dateTime('date_reservation')->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->decimal('montant_total', 15, 2)->nullable();
            $table->string('nom_client', 50)->nullable();
            $table->string('prenom_client', 50)->nullable();
            $table->string('telephone_client', 50)->nullable();
            $table->string('email_client', 50)->nullable();
            $table->string('cin_client', 50)->nullable();
            $table->boolean('valide')->nullable();

            $table->integer('id_voiture');
            $table->string('id_admin', 50);

            // Foreign keys
            $table->foreign('id_voiture')
                  ->references('id_voiture')
                  ->on('voiture')
                  ->onDelete('cascade');

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
        Schema::dropIfExists('location');
    }
};
