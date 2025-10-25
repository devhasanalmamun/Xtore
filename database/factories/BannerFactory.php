<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BannerFactory extends Factory
{
    public function definition(): array
    {
        return [
          'title' => $this->faker->sentence(3),
          'page' => $this->faker->randomElement(['home', 'about']),
          'section' => $this->faker->randomElement(['hero', 'sidebar']),
          'image' => $this->faker->imageUrl(1200, 600, 'business', true, 'Banner'),
          'active' => $this->faker->boolean(90),
          'created_by' => 1,
          'updated_by' => 1,
        ];
    }
}
