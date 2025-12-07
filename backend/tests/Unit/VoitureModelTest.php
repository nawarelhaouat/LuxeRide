<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Voiture;
use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VoitureModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_expected_fillable_properties()
    {
        $voiture = new Voiture();
        $this->assertEquals([
            'marque', 'modele', 'immatriculation', 'prix_par_jour',
            'image', 'statut', 'date_ajout', 'id_admin'
        ], $voiture->getFillable());
    }

    /** @test */
    public function it_belongs_to_admin()
    {
        $voiture = new Voiture();
        $relation = $voiture->admin();
        $this->assertEquals(Admin::class, get_class($relation->getRelated()));
    }

    /** @test */
    public function it_fails_if_price_is_negative()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        $voiture = Voiture::create([
            'marque' => 'Toyota',
            'modele' => 'Corolla',
            'immatriculation' => 'ABC123',
            'prix_par_jour' => -50, // prix négatif
            'image' => 'img.jpg',
            'statut' => 'disponible',
            'date_ajout' => now(),
            'id_admin' => 'ADM001',
        ]);
    }

    /** @test */
    public function it_fails_if_required_field_is_empty()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        $voiture = Voiture::create([
            'marque' => '',
            'modele' => 'Corolla',
            'immatriculation' => 'ABC123',
            'prix_par_jour' => 50,
            'image' => 'img.jpg',
            'statut' => 'disponible',
            'date_ajout' => now(),
            'id_admin' => 'ADM001',
        ]);
    }

    /** @test */
    public function it_fails_if_statut_is_invalid()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        $voiture = Voiture::create([
            'marque' => 'Toyota',
            'modele' => 'Corolla',
            'immatriculation' => 'ABC123',
            'prix_par_jour' => 50,
            'image' => 'img.jpg',
            'statut' => 'invalid_statut',
            'date_ajout' => now(),
            'id_admin' => 'ADM001',
        ]);
    }
}
