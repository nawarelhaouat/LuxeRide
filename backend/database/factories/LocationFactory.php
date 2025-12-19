<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Location;
use App\Models\Voiture;

use App\Models\Admin;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    protected $model = Location::class;

    public function definition(): array
    {
        // On utilise ta factory Voiture existante
        $voiture = Voiture::factory()->create([
            
        ]);

        return [
            'id_location'       => $this->faker->unique()->numberBetween(1, 99999),
            'date_reservation'  => now(),
            'date_debut'        => now()->addDay(),
            'date_fin'          => now()->addDays(3),
            'montant_total'     => $this->faker->numberBetween(500, 5000),

            'nom_client'        => $this->faker->firstName(),
            'prenom_client'     => $this->faker->lastName(),
            'telephone_client'  => '06' . $this->faker->numberBetween(10000000, 99999999),
            'email_client'      => $this->faker->safeEmail(),
            'cin_client'        => strtoupper($this->faker->bothify('??######')),

            'valide'            => false,

            // Foreign keys
            'id_admin'   => Admin::factory(),
            'id_voiture' => Voiture::factory(),
        ];
    }
}
