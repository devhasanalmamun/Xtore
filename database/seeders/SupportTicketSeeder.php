<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\SupportTicketStatusEnum;
use App\Models\SupportTicket;
use Illuminate\Database\Seeder;

class SupportTicketSeeder extends Seeder
{
    public function run(): void
    {
        $tickets = [
            [
                'created_by' => 2, // Vendor
                'category_id' => 1, // Support Ticket Category ID --> Technical Support
                'subject' => 'Product not working as expected ID #123456',
                'description' => 'My product is not working as expected',
                'status' => SupportTicketStatusEnum::OPEN->value,
            ],
            [
                'created_by' => 1, // Customer
                'category_id' => 2, // Support Ticket Category ID --> Order Issues
                'subject' => 'Order not received ID #123456',
                'description' => 'I have not received my order yet',
                'status' => SupportTicketStatusEnum::OPEN->value,
            ],
            [
                'created_by' => 2, // Vendor
                'category_id' => 3, // Support Ticket Category ID --> Account Access Problems
                'subject' => 'Account access not received Email: test@example.com',
                'description' => 'I have not received my account access yet',
                'status' => SupportTicketStatusEnum::OPEN->value,
            ],
        ];

        foreach ($tickets as $ticket) {
            SupportTicket::create($ticket);
        }
    }
}
