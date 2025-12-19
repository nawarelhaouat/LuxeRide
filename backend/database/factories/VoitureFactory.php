<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voiture>
 */
class VoitureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $admin = Admin::factory()->create();

        return [
            'marque' => $this->faker->company(),
            'modele' => $this->faker->word(),
            'immatriculation' => strtoupper($this->faker->unique()->bothify('??###??')),
            'prix_par_jour' => $this->faker->numberBetween(100, 1000),
            'image' => $this->faker->imageUrl(640, 480, 'cars'),
            'statut' => $this->faker->randomElement(['disponible', 'loue', 'en_maintenance']),
            'id_admin' => Admin::factory(),
            'date_ajout' => now(),
        ];
    }
}
