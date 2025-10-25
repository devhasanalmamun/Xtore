<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::factory()->createMany(
            [
                // For Department ----- Electronics
                [
                    'department_id' => 1,
                    'parent_id' => null,
                    'name' => 'PC Components'
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 1, // Assuming parent category PC Components
                    'name' => 'Storage Device'
                ],
                [
                    'department_id' => 1,
                    'parent_id' => null,
                    'name' => 'Devices'
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 3, // Assuming parent category Devices
                    'name' => 'Mobile Phone'
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 2, // Assuming parent Storage Devices
                    'name' => 'SSD'
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 1, // Assuming parent category PC Components
                    'name' => 'RAM'
                ],

                // For Department ----- Clothing and fashion
                [
                  'department_id' => 2,
                  'parent_id' => null,
                  'name' => "Men's Clothing"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => null,
                  'name' => "Women's Clothing"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 7, // Assuming parent category Men's Clothing
                  'name' => "Men's Shirts"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 7, // Assuming parent category Men's Clothing
                  'name' => "Men's Jeans"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 7, // Assuming parent category Men's Clothing
                  'name' => "Men's Underwear's"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 7, // Assuming parent category Men's Clothing
                  'name' => "Men's Shoes"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 8, // Assuming parent category Women's Clothing
                  'name' => "Women's Shirts"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 8, // Assuming parent category Women's Clothing
                  'name' => "Women's Jeans"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 8, // Assuming parent category Women's Clothing
                  'name' => "Women's Underwear's"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 15, // Assuming parent category Women's Underwear's
                  'name' => "Bra"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 15, // Assuming parent category Women's Underwear's
                  'name' => "Panties"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 17, // Assuming parent category Panties
                  'name' => "Thong"
                ],
                [
                  'department_id' => 2,
                  'parent_id' => 8, // Assuming parent category Women's Clothing
                  'name' => "Women's Shoes"
                ],
            ]
        );
    }
}
