<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->createMany([
            [
                'first_name' => 'Customer',
                'last_name' => 'User',
                'email' => 'customer@example.com',
                'role' => UserRoleEnum::CUSTOMER,
            ],
            [
                'first_name' => 'Vendor',
                'last_name' => 'User',
                'email' => 'vendor@example.com',
                'role' => UserRoleEnum::VENDOR,
            ],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'email' => 'admin@example.com',
                'role' => UserRoleEnum::ADMIN,
            ],
        ]);

        User::factory()->count(7)->create();
    }
}
