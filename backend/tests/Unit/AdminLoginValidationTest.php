<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Validator;

class AdminLoginValidationTest extends TestCase
{
    public function test_code_is_required()
    {
        // Arrange : on simule une requête sans code
        $data = [];

        // Les mêmes règles que dans ton contrôleur AdminAuthController
        $rules = [
            'code' => 'required',
        ];

        // Act : on applique la validation Laravel "à la main"
        $validator = Validator::make($data, $rules);

        // Assert : la validation doit échouer
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('code', $validator->errors()->messages());
    }

    public function test_code_is_accepted_when_present()
    {
        // Arrange : cette fois on envoie bien un code
        $data = [
            'code' => '1234',
        ];

        $rules = [
            'code' => 'required',
        ];

        // Act
        $validator = Validator::make($data, $rules);

        // Assert : la validation doit passer
        $this->assertFalse($validator->fails());
    }
}
