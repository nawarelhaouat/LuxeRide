<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Voiture;
use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VoitureControllerTest extends TestCase
{
    use RefreshDatabase;

    protected Admin $admin;

    protected function setUp(): void
    {
        parent::setUp();

        // Créer un admin pour les tests
        $this->admin = Admin::factory()->create();
    }

    /** @test */
    public function it_can_list_all_voitures()
    {
        Voiture::factory()->count(3)->create([
            'id_admin' => $this->admin->id_admin
        ]);

        $response = $this->getJson('/api/voiture');

        $response->assertStatus(200)
            ->assertJsonCount(3)
            ->assertJsonStructure([
                '*' => ['id', 'brand', 'model', 'plate_number', 'price_per_day', 'status', 'image_url']
            ]);
    }

    /** @test */
    public function it_can_filter_voitures_by_status()
    {
        Voiture::factory()->create(['statut' => 'disponible', 'id_admin' => $this->admin->id_admin]);
        Voiture::factory()->create(['statut' => 'loue', 'id_admin' => $this->admin->id_admin]);

        $response = $this->getJson('/api/voiture?statut=disponible');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment(['status' => 'disponible']);
    }

    /** @test */
    public function it_can_show_a_voiture()
    {
        $voiture = Voiture::factory()->create(['id_admin' => $this->admin->id_admin]);

        $response = $this->getJson("/api/voiture/{$voiture->id_voiture}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $voiture->id_voiture,
                'brand' => $voiture->marque,
                'model' => $voiture->modele,
            ]);
    }

    /** @test */
    public function admin_can_create_a_voiture()
    {
        $data = [
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'plate_number' => 'XYZ123',
            'price_per_day' => 50,
            'status' => 'disponible',
            'id_admin' => $this->admin->id_admin,
        ];

        $response = $this->actingAs($this->admin, 'admin')
            ->postJson('/api/voiture', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['plate_number' => 'XYZ123']);

        $this->assertDatabaseHas('voiture', ['immatriculation' => 'XYZ123']);
    }

    /** @test */
    public function admin_can_update_a_voiture()
    {
        $voiture = Voiture::factory()->create(['id_admin' => $this->admin->id_admin]);

        $response = $this->actingAs($this->admin, 'admin')
            ->putJson("/api/voiture/{$voiture->id_voiture}", [
                'price_per_day' => 80,
                'status' => 'loue'
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['price_per_day' => 80, 'status' => 'loue']);

        $this->assertDatabaseHas('voiture', ['id_voiture' => $voiture->id_voiture, 'prix_par_jour' => 80]);
    }

    /** @test */
    public function admin_can_delete_a_voiture()
    {
        $voiture = Voiture::factory()->create(['id_admin' => $this->admin->id_admin]);

        $response = $this->actingAs($this->admin, 'admin')
            ->deleteJson("/api/voiture/{$voiture->id_voiture}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Voiture supprimée']);

        $this->assertDatabaseMissing('voiture', ['id_voiture' => $voiture->id_voiture]);
    }

    /** @test */
    /*public function validation_works_on_create()
    {
        $response = $this->postJson('/api/voiture', [
            'brand' => 'Toyota',
            'model' => '',
            'plate_number' => 'XYZ123',
            'price_per_day' => 50,
            'status' => 'disponible',
            'id_admin' => $this->admin->id_admin,
        ]);

        $response->assertStatus(422)
        ->assertJsonValidationErrors(['brand', 'model', 'price_per_day', 'status', 'id_admin']);
    }*/
}
