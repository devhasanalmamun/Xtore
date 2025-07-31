<?php 

namespace App\Traits;

use App\Enums\UserRoleEnum;

trait HasRoles 
{
    public function isUser(): bool
	{
		return $this->roleIs(UserRoleEnum::USER);
	}

	public function isVendor(): bool
	{
		return $this->roleIs(UserRoleEnum::VENDOR);
	}

	public function isAdmin(): bool
	{
		return $this->roleIs(UserRoleEnum::ADMIN);
	}

	private function roleIs(UserRoleEnum $role): bool
	{
		return $this->role === $role->value;
	}
}