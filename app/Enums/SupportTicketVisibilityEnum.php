<?php

declare(strict_types=1);

namespace App\Enums;

enum SupportTicketVisibilityEnum: string
{
    case CUSTOMER = 'customer';
    case VENDOR = 'vendor';
    case BOTH = 'both';

    public static function values(): array
    {
        return array_values(array_map(fn (self $case) => $case->value, self::cases()));
    }
}
