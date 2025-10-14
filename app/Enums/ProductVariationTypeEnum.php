<?php

namespace App\Enums;

enum ProductVariationTypeEnum : string
{
    case RADIO = 'radio';
    case SELECT = 'select';
    case IMAGE = 'image';

    public function label() : string
    {
      return match($this) {
        self::RADIO => 'Radio',
        self::SELECT => 'Select',
        self::IMAGE => 'Image',
      };
    }

    public function labels() :array
    {
      return array_map(fn(self $case)=> [
        'value' => $case->value,
        'label' => $case->label(),
      ], self::cases());
    }
}
