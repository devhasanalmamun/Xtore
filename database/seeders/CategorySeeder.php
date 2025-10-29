<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

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
                    'name' => 'PC Components',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/pc-components.png',
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 1, // Assuming parent category PC Components
                    'name' => 'Storage Device',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/storage-devices.webp',
                ],
                [
                    'department_id' => 1,
                    'parent_id' => null,
                    'name' => 'Devices',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/devices.jpg',
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 3, // Assuming parent category Devices
                    'name' => 'Mobile Phone',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/mobile-phone.jpg',
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 2, // Assuming parent Storage Devices
                    'name' => 'SSD',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/ssds.webp',
                ],
                [
                    'department_id' => 1,
                    'parent_id' => 1, // Assuming parent category PC Components
                    'name' => 'RAM',
                    'image' => 'https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/ram.jpg',
                ],

                // For Department ----- Clothing and fashion
                [
                    'department_id' => 2,
                    'parent_id' => null,
                    'name' => "Men's Clothing",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/men's-clothings.jpg",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => null,
                    'name' => "Women's Clothing",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's clothing.jpg",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 7, // Assuming parent category Men's Clothing
                    'name' => "Men's Shirts",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/men's-shirts.jpeg",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 7, // Assuming parent category Men's Clothing
                    'name' => "Men's Jeans",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/men's-jeans.jpg",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 7, // Assuming parent category Men's Clothing
                    'name' => "Men's Underwear's",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/men's-underwears.webp",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 7, // Assuming parent category Men's Clothing
                    'name' => "Men's Shoes",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/men's-shoes.png",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 8, // Assuming parent category Women's Clothing
                    'name' => "Women's Shirts",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-shirts.png",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 8, // Assuming parent category Women's Clothing
                    'name' => "Women's Jeans",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-jeans.jpg",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 8, // Assuming parent category Women's Clothing
                    'name' => "Women's Underwear's",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-underwear.webp",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 15, // Assuming parent category Women's Underwear's
                    'name' => 'Bra',
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-bra.webp",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 15, // Assuming parent category Women's Underwear's
                    'name' => 'Panties',
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-panties.webp",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 17, // Assuming parent category Panties
                    'name' => 'Thong',
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-thong.webp",
                ],
                [
                    'department_id' => 2,
                    'parent_id' => 8, // Assuming parent category Women's Clothing
                    'name' => "Women's Shoes",
                    'image' => "https://pub-25a3dabe9c864589b873ad988ec26819.r2.dev/categories/women's-shoes.webp",
                ],
            ]
        );
    }
}
