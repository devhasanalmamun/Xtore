<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\ProductStatusEnum;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2,true);

        return [
            'department_id'=> $this->faker->numberBetween(2, 10),
            'category_id'=> $this->faker->numberBetween(2, 6),
            'created_by'=> 2,
            'updated_by'=> 2,
            'title'=> ucfirst($name),
            'slug'=> Str::slug($name),
            'description'=> $this->faker->sentence(10),
            'price' => $this->faker->randomFloat(50, 5000),
            'quantity' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(ProductStatusEnum::cases())->value,
            'thumbnail_url' => 'https://res.cloudinary.com/dpxzczlob/image/upload/v1757261351/Xtore/default-gray-product_qlwb9v.jpg',
            'thumbnail_public_id' => 'Xtore/default-gray-product_qlwb9v.jpg',
            'meta_title' => $this->faker->sentence(2),
            'meta_description' => $this->faker->sentence(6),
        ];
    }
}
