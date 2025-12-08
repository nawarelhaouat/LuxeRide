<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Admin;

class AdminFactory extends Factory
{
    protected $model = Admin::class;

    public function definition(): array
    {
        return [
            // ID string unique
            'id_admin' => 'ADM' . $this->faker->unique()->numberBetween(1, 9999),

            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),

            // Email unique
            'email' => $this->faker->unique()->safeEmail(),

            'telephone' => $this->faker->phoneNumber(),

            // Code sécurisé aléatoire à 4 chiffres
            'code' => $this->faker->numerify('####'),
        ];
    }
}
