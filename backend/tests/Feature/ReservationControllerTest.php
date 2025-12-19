<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Location;
use App\Models\Voiture;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class ReservationControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithoutMiddleware;
    protected function createReservation()
    {
        $voiture = Voiture::factory()->create([
            'marque' => 'Toyota',
            'modele' => 'Corolla',
            'immatriculation' => '123-ABC'
        ]);

        return Location::factory()->create([
            'id_voiture' => $voiture->id_voiture,
            'valide' => false,
            'nom_client' => 'Ahmed',
            'prenom_client' => 'Ali'
        ]);
    }

    /** @test */
    public function index_returns_all_reservations()
    {
        $this->createReservation();

        $response = $this->getJson('/api/admin/Reservation');

        $response->assertStatus(200)
         ->assertJsonStructure([
             'message',
             '0' => [
                 '*' => [
                     'id_location',
                     'nom_client',
                     'prenom_client',
                     'marque',
                     'modele',
                     'immatriculation',
                     'valide'
                 ]
             ]
         ]);

    }

    /** @test */
    public function index_fails_if_only_one_date_is_provided()
    {
        $response = $this->getJson('/api/admin/Reservation?date_debut=2024-01-01');

        $response->assertStatus(400)
                 ->assertJson([
                     'status' => 'error'
                 ]);
    }

    /** @test */
    public function show_returns_single_reservation()
    {
        $reservation = $this->createReservation();

        $response = $this->getJson("/api/admin/Reservation/{$reservation->id_location}");

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'nom_client' => 'Ahmed',
                     'statut' => 'non valide'
                 ]);
    }

    /** @test */
    public function show_returns_404_if_not_found()
    {
        $response = $this->getJson('/api/admin/Reservation/999');

        $response->assertStatus(404);
    }

    /** @test */
    public function update_changes_reservation_status()
    {
        $reservation = $this->createReservation();

        $response = $this->patchJson("/api/admin/Reservation/{$reservation->id_location}", [
            'statut' => 'valide'
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'statut' => 'valide'
                 ]);

        $this->assertDatabaseHas('location', [
            'id_location' => $reservation->id_location,
            'valide' => true
        ]);
    }

    /** @test */
    public function update_fails_with_invalid_status()
    {
        $reservation = $this->createReservation();

        $response = $this->patchJson("/api/admin/Reservation/{$reservation->id_location}", [
            'statut' => 'pending'
        ]);

        $response->assertStatus(422);
    }
}
