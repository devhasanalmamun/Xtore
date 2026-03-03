<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\SupportTicketCategoryVisibilityEnum;
use App\Models\SupportTicketCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SupportTicketCategorySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // BOTH (buyer + vendor)
            ['Technical Support', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Payment Issues', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Account Access Problems', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Coupon & Promotion Issues', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Policy & Compliance', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Verification & KYC', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Feature Request', SupportTicketCategoryVisibilityEnum::BOTH],
            ['Other', SupportTicketCategoryVisibilityEnum::BOTH],

            // BUYER-only
            ['Order Issues', SupportTicketCategoryVisibilityEnum::CUSTOMER],
            ['Shipping & Delivery', SupportTicketCategoryVisibilityEnum::CUSTOMER],
            ['Refund & Returns', SupportTicketCategoryVisibilityEnum::CUSTOMER],
            ['Report a Seller', SupportTicketCategoryVisibilityEnum::CUSTOMER],

            // VENDOR-only
            ['Vendor Account Support', SupportTicketCategoryVisibilityEnum::VENDOR],
            ['Product Listing Issues', SupportTicketCategoryVisibilityEnum::VENDOR],
            ['Commission & Payout Issues', SupportTicketCategoryVisibilityEnum::VENDOR],
            ['Report a Buyer', SupportTicketCategoryVisibilityEnum::VENDOR],
        ];

        foreach ($items as $index => [$name, $visibility]) {
            SupportTicketCategory::Create([
                'slug' => Str::slug($name),
                'name' => $name,
                'visibility' => $visibility->value,
                'active' => true,
                'sort_order' => $index + 1,
            ]);
        }
    }
}
