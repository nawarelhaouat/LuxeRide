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
        Schema::create('voiture', function (Blueprint $table) {

            $table->increments('id_voiture');
            $table->string('marque', 50);
            $table->string('modele', 50);
            $table->string('immatriculation', 50);
            $table->decimal('prix_par_jour', 15, 2);
            $table->string('image', 50)->nullable();
            $table->enum('statut', ['disponible', 'loue', 'en_maintenance']);
            $table->dateTime('date_ajout')->nullable();
            $table->string('id_admin', 50);

            // Foreign key → ADMIN(id_admin)
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
        Schema::dropIfExists('voiture');
    }
};
