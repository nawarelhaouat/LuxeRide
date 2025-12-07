<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_login_with_correct_code()
    {
        // Arrange: créer un admin factice
        $admin = Admin::factory()->create([
            'code' => '1234',
        ]);

        // Act: envoyer la requête
        $response = $this->postJson('/api/admin/login', [
            'code' => '1234',
        ]);

        // Assert: vérifier la réponse
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'admin' => ['id_admin', 'nom', 'prenom'],
                     'token'
                 ]);

        // Vérifier que le token est enregistré en base
        $this->assertDatabaseHas('personal_access_tokens', [
           'name' => 'admin_token',
        ]);

    }

    /** @test */
    public function login_fails_with_wrong_code()
    {
        // Aucun admin ne correspond à ce code
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
        // Pas de code → échec validation
        $response = $this->postJson('/api/admin/login', []);

        $response->assertStatus(422) // Laravel renvoie 422 validation error
                 ->assertJsonValidationErrors(['code']);
    }

    /** @test */
    public function token_is_correctly_returned_in_response()
    {
        // Arrange
        $admin = Admin::factory()->create(['code' => '9999']);

        // Act
        $response = $this->postJson('/api/admin/login', ['code' => '9999']);

        // Assert: vérifier le token
        $response->assertStatus(200);
        $this->assertTrue(isset($response['token']));
        $this->assertNotEmpty($response['token']);
    }
}
