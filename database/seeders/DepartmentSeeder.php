<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            'Electronics', 
            'Clothing & Fashion', 
            'Home & Kitchen', 
            'Sports & Outdoors', 
            'Health & Beauty',
            'Toys & Games',
            'Automotive',
            'Books & Stationery',
            'Grocery & Food',
            'Jewelry',
            'Furniture',
            'Pet Supplies'
        ];

        foreach ($departments as $name){
            Department::factory()->create([
                'name' => $name,
                'slug' => Str::slug($name),
                'meta_title' => "Explore the products in $name",
                'meta_description' => "Find the best and trending items in the $name category.",
                'active' => true,
            ]);
        }
    }
}
