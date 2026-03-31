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
                'first_name' => 'Customer One',
                'last_name' => 'User',
                'email' => 'customer@example.com',
                'role' => UserRoleEnum::CUSTOMER,
            ],
            [
                'first_name' => 'Customer Two',
                'last_name' => 'User',
                'email' => 'customer2@example.com',
                'role' => UserRoleEnum::CUSTOMER,
            ],
            [
                'first_name' => 'Vendor One',
                'last_name' => 'User',
                'email' => 'vendor@example.com',
                'role' => UserRoleEnum::VENDOR,
            ],
            [
                'first_name' => 'Vendor Two',
                'last_name' => 'User',
                'email' => 'vendor2@example.com',
                'role' => UserRoleEnum::VENDOR,
            ],
            [
                'first_name' => 'Admin One',
                'last_name' => 'User',
                'email' => 'admin@example.com',
                'role' => UserRoleEnum::ADMIN,
            ],
            [
                'first_name' => 'Admin Two',
                'last_name' => 'User',
                'email' => 'admin2@example.com',
                'role' => UserRoleEnum::ADMIN,
            ],
        ]);

        User::factory()->count(7)->create();
    }
}
