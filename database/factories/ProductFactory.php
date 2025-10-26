<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);

        return [
            'department_id' => $this->faker->numberBetween(2, 10),
            'category_id' => $this->faker->numberBetween(2, 6),
            'created_by' => 2,
            'updated_by' => 2,
            'title' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(10),
            'price' => $this->faker->randomFloat(50, 5000),
            'quantity' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(ProductStatusEnum::cases())->value,
            'meta_title' => $this->faker->sentence(2),
            'meta_description' => $this->faker->sentence(6),
        ];
    }
}
