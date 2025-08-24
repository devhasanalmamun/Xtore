<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Department;
use App\Models\Category;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2,true);

        return [
            'department_id'=> Department::inRandomOrder()->value('id'),
            'parent_id'=> $this->faker->boolean(80) ? Category::inRandomOrder()->value('id') : null,
            'slug'=> Str::slug($name),
            'name'=> ucfirst($name),
            'meta_title' => $this->faker->sentence(2),
            'meta_description' => $this->faker->sentence(6),
            'active'=> $this->faker->boolean(80)
        ];
    }
}
