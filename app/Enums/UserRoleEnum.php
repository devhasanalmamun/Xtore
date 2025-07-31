<?php

namespace App\Enums;

enum UserRoleEnum: string 
{
    case ADMIN = 'admin';
    case VENDOR = 'vendor';
    case USER = 'user';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::VENDOR => 'Vendor',
            self::USER => 'User',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
