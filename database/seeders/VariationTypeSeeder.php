<?php

namespace Database\Seeders;

use App\Models\VariationType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VariationTypeSeeder extends Seeder
{
    public function run(): void
    {
        $variation_types = ['Color', 'Size', 'Volume', 'Fabrics', 'Material', 'Weight'];

        foreach ($variation_types as $type) {
          VariationType::create([
            'name' => $type,
            'slug' => Str::slug($type),
            'active' => true
          ]);
        }
    }
}
