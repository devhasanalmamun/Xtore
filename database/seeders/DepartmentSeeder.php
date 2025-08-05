<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = ['Electronics', 'Clothings', 'Home & Kitchen'];

        foreach ($departments as $name){
            Department::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'meta_title' => "Explore the products in $name",
                'meta_description' => "Find the best and trending items in the $name category.",
                'active' => true,
            ]);
        }

        Department::factory()->count(7)->create([
            'active' => true,
        ]);
    }
}
