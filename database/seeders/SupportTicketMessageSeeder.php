<?php

declare(strict_types=1);

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

            ],
            [
                'support_ticket_id' => 1,
                'sender_id' => 3, // Admin
                'message' => 'Could you please provide a screenshot of the error message?',

            ],
            [
                'support_ticket_id' => 1,
                'sender_id' => 2, // Vendor
                'message' => 'Thank you for your help. I will send you a screenshot of the error message.',

            ],
            [
                'support_ticket_id' => 1,
                'sender_id' => 3, // Admin
                'message' => 'We have located the issue. It is due to a technical glitch in the system. We will fix it as soon as possible.',

            ],
            [
                'support_ticket_id' => 1,
                'sender_id' => 2, // Vendor
                'message' => 'Thank you for your help. I have sent you a screenshot of the error message.',

            ],
            [
                'support_ticket_id' => 1,
                'sender_id' => 3, // Admin
                'message' => 'We have fixed the issue. You can now log in to your account and continue using the system.',

            ],
            [
                'support_ticket_id' => 2,
                'sender_id' => 1, // Customer
                'message' => 'My order has not arrived yet.',

            ],
            [
                'support_ticket_id' => 2,
                'sender_id' => 3, // Admin
                'message' => 'We are checking with the courier. Please wait a moment.',

            ],
            [
                'support_ticket_id' => 3,
                'sender_id' => 2, // Vendor
                'message' => 'I cannot log in to my account dashboard.',

            ],
            [
                'support_ticket_id' => 3,
                'sender_id' => 3, // Admin
                'message' => 'Please try resetting your password using the forgot password option.',

            ],
        ];

        foreach ($messages as $message) {
            SupportTicketMessage::create($message);
        }
    }
}
