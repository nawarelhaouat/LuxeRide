<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ForgotPasswordUnitTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function retourne_null_si_admin_nexiste_pas()
    {
        $admin = Admin::where('email', 'inexistant@test.com')->first();

        $this->assertNull($admin);
    }

    /** @test */
    public function retourne_admin_si_email_existe()
    {
        $created = Admin::factory()->create([
            'email' => 'test@example.com'
        ]);

        $admin = Admin::where('email', 'test@example.com')->first();

        $this->assertNotNull($admin);
        $this->assertEquals('test@example.com', $admin->email);
    }
}
