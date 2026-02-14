<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            BannerSeeder::class,
            DepartmentSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            VariationTypeSeeder::class,
            SupportTicketCategorySeeder::class,
        ]);

        Banner::factory(10)->create();
    }
}
