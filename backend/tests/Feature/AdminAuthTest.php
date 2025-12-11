<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use App\Mail\Contact;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_login_with_correct_code()
    {
        $admin = Admin::factory()->create([
            'code' => '1234',
        ]);

        $response = $this->postJson('/api/admin/login', [
            'code' => '1234',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'admin' => ['id_admin', 'nom', 'prenom'],
                     'token'
                 ]);

        $this->assertDatabaseHas('personal_access_tokens', [
           'name' => 'admin_token',
        ]);

    }

    /** @test */
    public function login_fails_with_wrong_code()
    {

        $response = $this->postJson('/api/admin/login', [
            'code' => '0000',
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Code incorrect'
                 ]);
    }

    /** @test */
    public function login_fails_when_code_is_missing()
    {

        $response = $this->postJson('/api/admin/login', []);

        $response->assertStatus(422) 
                 ->assertJsonValidationErrors(['code']);
    }

    /** @test */
    public function token_is_correctly_returned_in_response()
    {
        $admin = Admin::factory()->create(['code' => '9999']);


        $response = $this->postJson('/api/admin/login', ['code' => '9999']);

        $response->assertStatus(200);
        $this->assertTrue(isset($response['token']));
        $this->assertNotEmpty($response['token']);
    }
    /** @test */
    public function retourne_404_si_email_n_existe_pas()
    {
        $response = $this->postJson('/api/admin/recover-password', [
            'email' => 'inconnu@example.com'
        ]);

        $response->assertStatus(404)
                 ->assertJson([
                     'message' => 'Email non trouvé'
                 ]);
    }

    /** @test */
  public function envoie_email_si_email_existe()
{
    Mail::fake();

    $admin = Admin::factory()->create([
        'email' => 'test@example.com',
        'code'  => '1234'
    ]);

    $response = $this->postJson('/api/admin/recover-password', [
        'email' => 'test@example.com'
    ]);

   Mail::assertSent(Contact::class);


    $response->assertStatus(200)
             ->assertJson([
                 'message' => 'Votre mot de passe a été envoyé par email.'
             ]);
}
}
