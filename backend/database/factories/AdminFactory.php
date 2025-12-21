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
            'id_admin'  => 'ADM' . $this->faker->unique()->numberBetween(100, 999),
            'nom'       => $this->faker->lastName(),
            'prenom'    => $this->faker->firstName(),
            'email'     => $this->faker->unique()->safeEmail(),
            'telephone' => $this->faker->phoneNumber(),
            'code'      => $this->faker->numerify('####'),
        ];
    }
}
