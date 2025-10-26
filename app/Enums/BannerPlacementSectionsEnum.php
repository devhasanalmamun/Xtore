<?php

declare(strict_types=1);

namespace App\Enums;

enum BannerPlacementSectionsEnum: string
{
    case HERO = 'hero';
    case SIDEBAR = 'sidebar';

    public function label(): string
    {
        return match ($this) {
            self::HERO => 'Hero',
            self::SIDEBAR => 'Sidebar',
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
