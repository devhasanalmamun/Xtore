<?php

declare(strict_types=1);

namespace App\Enums;

enum BannerPlacementPagesEnum: string
{
    case HOMEPAGE = 'homepage';
    case ABOUTPAGE = 'aboutpage';

    public function label(): string
    {
        return match ($this) {
            self::HOMEPAGE => 'Home Page',
            self::ABOUTPAGE => 'About Page',
        };
    }

    public function labels(): array
    {
        return array_map(fn (self $case) => [
            'value' => $case->value,
            'label' => $case->label(),
        ], self::cases());
    }
}
