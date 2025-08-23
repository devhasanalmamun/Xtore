<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::factory()->count(5)->create(['parent_id' => null]);
        Category::factory()->count(25)->create();
    }
}
