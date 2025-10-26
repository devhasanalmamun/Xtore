<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('department_id')->index()->constrained('departments');
            $table->foreignId('category_id')->index()->constrained('categories');
            $table->foreignId('created_by')->index()->constrained('users');
            $table->foreignId('updated_by')->index()->constrained('users');
            $table->string('title', 2000);
            $table->string('slug')->unique();
            $table->longText('description');
            $table->decimal('price', 20);
            $table->integer('quantity')->nullable();
            $table->string('status')->index();

            // TODO: Remove nullable for these images before it goes to production
            $table->string('thumbnail_image')->nullable();
            $table->json('product_images')->nullable();

            $table->string('meta_title');
            $table->string('meta_description');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
