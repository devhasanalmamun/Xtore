<?php

declare(strict_types=1);

use App\Enums\SupportTicketStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('category_id')->constrained('support_ticket_categories')->restrictOnDelete();

            $table->string('subject');
            $table->longText('description');
            $table->json('images')->nullable();
            $table->string('status')->default(SupportTicketStatusEnum::OPEN->value);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('support_tickets');
    }
};
