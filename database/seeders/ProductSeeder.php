<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
	{
		Product::factory()->createMany([
			[
				'department_id' => 1, // Assuming Department Electronics
				'category_id' => 5, // Assuming Category SSD
				'title' => '0_Samsung 970 EVO Plus 1TB NVMe M.2 SSD',
				'slug' => 'samsung-970-evo-plus-1tb-nvme-m2-ssd',
				'description' => 'The Samsung 970 EVO Plus 1TB NVMe M.2 SSD delivers exceptional speed and reliability. Featuring read speeds up to 3,500 MB/s and write speeds up to 3,300 MB/s, it is ideal for gaming, video editing, and high-performance computing.',
				'price' => 10900,
				'quantity' => 50,
				'status' => 'published',
        'thumbnail_image' => 'https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/Best-Brand-Name-Items_Hero_sr3qkm.webp',
        'thumbnail_public_id' => 'demo-seeder/Best-Brand-Name-Items_Hero_sr3qkm.webp',
        'product_images' => ['https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/Best-Brand-Name-Items_Hero_sr3qkm.webp'],
        'product_image_public_ids' => ['demo-seeder/Best-Brand-Name-Items_Hero_sr3qkm.webp']
			],
			[
				'department_id' => 1, // Assuming Department Electronics
				'category_id' => 5, // Assuming Category SSD
				'title' => '0_WD Black SN850X 1TB NVMe M.2 SSD',
				'slug' => 'wd-black-sn850x-1tb-nvme-m2-ssd',
				'description' => 'The WD Black SN850X 1TB NVMe M.2 SSD is built for next-level performance with PCIe Gen4 technology. Offering blazing read speeds up to 7,300 MB/s and write speeds up to 6,300 MB/s, it ensures ultra-fast load times for gaming and professional workloads.',
				'price' => 11500,
				'quantity' => 40,
				'status' => 'published',
        'thumbnail_image' => 'https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/Promotional-Product-Trends-2024_Hero_vwolyn.webp',
        'thumbnail_public_id' => 'demo-seeder/Promotional-Product-Trends-2024_Hero_vwolyn.webp',
        'product_images' => ['https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/Promotional-Product-Trends-2024_Hero_vwolyn.webp'],
        'product_image_public_ids' => ['demo-seeder/Promotional-Product-Trends-2024_Hero_vwolyn.webp']
			],
			[
				'department_id' => 1, // Assuming Department Electronics
				'category_id' => 6, // Assuming Category RAM
				'title' => '0_Corsair Vengeance LPX 16GB DDR4 3200MHz RAM',
				'slug' => 'corsair-vengeance-lpx-16gb-ddr4-3200mhz-ram',
				'description' => 'The Corsair Vengeance LPX 16GB DDR4 3200MHz RAM is designed for high-performance overclocking. It features a pure aluminum heat spreader for faster heat dissipation and an eight-layer PCB to manage heat and provide superior overclocking headroom.',
				'price' => 6000,
				'quantity' => 30,
				'status' => 'published',
        'thumbnail_image' => 'https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/splash-03-605-v1_v2l59p.webp',
        'thumbnail_public_id' => 'demo-seeder/splash-03-605-v1_v2l59p.webp',
        'product_images' => ['https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/Promotional-Product-Trends-2024_Hero_vwolyn.webp','https://res.cloudinary.com/dpxzczlob/image/upload/v1760011866/demo-seeder/splash-03-605-v1_v2l59p.webp'],
        'product_image_public_ids' => ['demo-seeder/Promotional-Product-Trends-2024_Hero_vwolyn.webp', 'demo-seeder/splash-03-605-v1_v2l59p.webp']
			],
		]);

    Product::factory()->count(6)->createMany();
	}
}
