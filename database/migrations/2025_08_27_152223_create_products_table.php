<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->index()->constrained('departments');
            $table->foreignId('category_id')->index()->constrained('categories');
            $table->foreignId('created_by')->index()->constrained('users');
            $table->foreignId('updated_by')->index()->constrained('users');
            $table->string('title', 2000);
            $table->string('slug', 2000);
            $table->longText('description');
            $table->decimal('price', 20, 4);
            $table->integer('quantity')->nullable();
            $table->string('status')->index();
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
