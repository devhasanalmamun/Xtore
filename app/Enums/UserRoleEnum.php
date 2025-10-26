<?php

declare(strict_types=1);

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = 'admin';
    case VENDOR = 'vendor';
    case CUSTOMER = 'customer';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::VENDOR => 'Vendor',
            self::CUSTOMER => 'User',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
