<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\User;
use Spatie\LaravelData\Attributes\Hidden;
use Spatie\LaravelData\Attributes\Validation\{Confirmed, Email, Max, Password, Required, Unique};
use Spatie\LaravelData\Data;

final class RegisteredUserData extends Data
{
    public function __construct(
        #[Required, Max(255)]
        public readonly string $first_name,

        #[Required, Max(255)]
        public readonly string $last_name,

        #[Required, Max(255), Email(Email::NoRfcWarningsValidation), Unique(User::class, 'email')]
        public readonly string $email,

        #[Required, Max(255), Confirmed, Password(min: 8, letters: true, numbers: true)]
        public readonly string $password,

        #[Hidden]
        public readonly string $password_confirmation,
    ) {}
}
