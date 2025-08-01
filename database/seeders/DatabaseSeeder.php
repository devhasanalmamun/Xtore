<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->createMany([
            [
                'name' => 'User',
                'email' => 'user@example.com',
                'role' => UserRoleEnum::USER
            ],
            [
                'name' => 'Vendor',
                'email' => 'vendor@example.com',
                'role' => UserRoleEnum::VENDOR
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'role' => UserRoleEnum::ADMIN
            ],
        ]);
    }
}
