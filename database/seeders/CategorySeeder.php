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
                [
                    'department_id' => 1, // Assuming Electronics
                    'parent_id' => null, 
                    'name' => 'PC Components' 
                ],
                [
                    'department_id' => 1, // Assuming Electronics
                    'parent_id' => 1, // Assuming parent category PC Components
                    'name' => 'Storage Device' 
                ],
                [
                    'department_id' => 1, // Assuming Electronics
                    'parent_id' => null,
                    'name' => 'Devices' 
                ],
                [
                    'department_id' => 1, // Assuming Electronics
                    'parent_id' => 3, // Assuming parent category Devices
                    'name' => 'Mobile Phone' 
                ],
                [
                    'department_id' => 1, // Assuming Electronics
                    'parent_id' => 2, // Assuming parent Storage Devices
                    'name' => 'SSD' 
                ],
                [
                    'department_id' => 1, // Assuming Electronics
                    'parent_id' => 1, // Assuming parent category PC Components
                    'name' => 'RAM' 
                ],
            ]
        );
    }
}
