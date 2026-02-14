<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\SupportTicketVisibilityEnum;
use App\Models\SupportTicketCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SupportTicketCategorySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // BOTH (buyer + vendor)
            ['Technical Support', SupportTicketVisibilityEnum::BOTH],
            ['Payment Issues', SupportTicketVisibilityEnum::BOTH],
            ['Account Access Problems', SupportTicketVisibilityEnum::BOTH],
            ['Coupon & Promotion Issues', SupportTicketVisibilityEnum::BOTH],
            ['Policy & Compliance', SupportTicketVisibilityEnum::BOTH],
            ['Verification & KYC', SupportTicketVisibilityEnum::BOTH],
            ['Feature Request', SupportTicketVisibilityEnum::BOTH],
            ['Other', SupportTicketVisibilityEnum::BOTH],

            // BUYER-only
            ['Order Issues', SupportTicketVisibilityEnum::CUSTOMER],
            ['Shipping & Delivery', SupportTicketVisibilityEnum::CUSTOMER],
            ['Refund & Returns', SupportTicketVisibilityEnum::CUSTOMER],
            ['Report a Seller', SupportTicketVisibilityEnum::CUSTOMER],

            // VENDOR-only
            ['Vendor Account Support', SupportTicketVisibilityEnum::VENDOR],
            ['Product Listing Issues', SupportTicketVisibilityEnum::VENDOR],
            ['Commission & Payout Issues', SupportTicketVisibilityEnum::VENDOR],
            ['Report a Buyer', SupportTicketVisibilityEnum::VENDOR],
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
