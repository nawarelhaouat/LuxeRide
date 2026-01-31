<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class LocationFactory extends Factory
{
    protected $model = Location::class;

    public function definition(): array
    {
        $dateDebut = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $dateFin   = (clone $dateDebut)->modify('+' . rand(1, 14) . ' days');

        return [
            'id_location'       => $this->faker->unique()->numberBetween(1000, 9999),
            'date_reservation'  => $this->faker->dateTimeBetween('-2 months', 'now'),
            'date_debut'        => $dateDebut->format('Y-m-d'),
            'date_fin'          => $dateFin->format('Y-m-d'),
            'montant_total'     => $this->faker->randomFloat(2, 500, 8000),
            'nom_client'        => $this->faker->lastName(),
            'prenom_client'     => $this->faker->firstName(),
            'telephone_client' => $this->faker->phoneNumber(),
            'email_client'      => $this->faker->safeEmail(),
            'cin_client'        => strtoupper($this->faker->bothify('??######')),
            'valide'            => $this->faker->boolean(),

            'id_voiture'        => DB::table('voiture')->inRandomOrder()->value('id_voiture'),
            'id_admin'          => DB::table('admin')->inRandomOrder()->value('id_admin'),
        ];
    }
}
