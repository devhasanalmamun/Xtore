<?php

declare(strict_types=1);

use App\Enums\ProductVariationTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variation_type', function (Blueprint $table) {
            $table->id();
            $table->foreignUlid('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('variation_type_id')->constrained('variation_types')->cascadeOnDelete();
            $table->string('display_type')->default(ProductVariationTypeEnum::RADIO->value);
            $table->timestamps();
        });

        Schema::create('variation_type_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variation_type_id')->constrained('product_variation_type')->cascadeOnDelete();
            $table->string('name');
            $table->string('value')->nullable();
            $table->timestamps();
        });

        Schema::create('product_variations', function (Blueprint $table) {
            $table->id();
            $table->foreignUlid('product_id')->constrained('products')->cascadeOnDelete();
            $table->json('variation_type_options_ids');
            $table->integer('stock');
            $table->decimal('price');
            $table->decimal('discount_percentage')->nullable();
            $table->json('images');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variations');
    }
};
