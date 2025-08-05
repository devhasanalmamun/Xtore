<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class DepartmentFactory extends Factory
{

    public function definition(): array
    {
        $name = ucfirst($this->faker->unique()->words(2, true));

        return [
            'name'=> $name,
            'slug' => Str::slug($name),
            'meta_title' => $this->faker->sentence(2),
            'meta_description' => $this->faker->sentence(6),
            'active' => $this->faker->boolean(80)
        ];
    }
}
