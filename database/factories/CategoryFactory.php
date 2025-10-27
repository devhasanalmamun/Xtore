<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\{Category, Department};
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);

        return [
            'department_id' => Department::inRandomOrder()->value('id'),
            'parent_id' => $this->faker->boolean(80) ? Category::inRandomOrder()->value('id') : null,
            'slug' => Str::slug($name),
            'name' => ucfirst($name),
            'image' => 'https://placehold.co/1200x600?text=Category',
            'meta_title' => $this->faker->sentence(2),
            'meta_description' => $this->faker->sentence(6),
            'active' => $this->faker->boolean(80),
        ];
    }
}
