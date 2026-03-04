<?php

namespace Database\Seeders;

use App\Models\SupportTicketMessage;
use Illuminate\Database\Seeder;

class SupportTicketMessageSeeder extends Seeder
{
    public function run(): void
    {
        $messages = [
            [
                'support_ticket_id' => 1,
                'sender_id' => 2, // Vendor
                'message' => 'Hello, I have a problem with my product',
                'attachments' => null,
            ],
            [
                'support_ticket_id' => 1,
                'sender_id' => 3, // Admin
                'message' => 'Could you please provide a screenshot of the error message?',
                'attachments' => null,
            ],
            [
                'support_ticket_id' => 2,
                'sender_id' => 1, // Customer
                'message' => 'My order has not arrived yet.',
                'attachments' => null,
            ],
            [
                'support_ticket_id' => 2,
                'sender_id' => 3, // Admin
                'message' => 'We are checking with the courier. Please wait a moment.',
                'attachments' => null,
            ],
            [
                'support_ticket_id' => 3,
                'sender_id' => 2, // Vendor
                'message' => 'I cannot log in to my account dashboard.',
                'attachments' => null,
            ],
            [
                'support_ticket_id' => 3,
                'sender_id' => 3, // Admin
                'message' => 'Please try resetting your password using the forgot password option.',
                'attachments' => null,
            ],
        ];

        foreach ($messages as $message) {
            SupportTicketMessage::create($message);
        }
    }
}
