<?php

declare(strict_types=1);

namespace App\Enums;

enum SupportTicketStatusEnum: string
{
    case OPEN = 'open';
    case RESOLVED = 'resolved';
    case CLOSED = 'closed';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
