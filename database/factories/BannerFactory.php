<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\{BannerPlacementPagesEnum, BannerPlacementSectionsEnum};
use Illuminate\Database\Eloquent\Factories\Factory;

class BannerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'page' => $this->faker->randomElement(BannerPlacementPagesEnum::cases())->value,
            'section' => $this->faker->randomElement(BannerPlacementSectionsEnum::cases())->value,
            'image' => 'https://placehold.co/1200x600?text=Banner',
            'active' => $this->faker->boolean(90),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
