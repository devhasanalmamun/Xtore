<?php

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Hidden;
use Spatie\LaravelData\Data;
use App\Models\User;

final class RegisteredUserData extends Data {
  public function __construct(
    #[Required, Max(255)]
    public readonly string $first_name,

    #[Required, Max(255)]
    public readonly string $last_name,

    #[Required, Max(255), Email(Email::NoRfcWarningsValidation), Unique(User::class, 'email')]
    public readonly string $email,

    #[Required, Max(255), Confirmed, Password(min:8, numbers:true, letters:true)]
    public readonly string $password,

    #[Hidden]
    public readonly string $password_confirmation,
  ){}
}
