<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Location;

class ReservationModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function reservation_status_is_boolean()
    {
        $reservation = Location::factory()->create([
            'valide' => true
        ]);

        $this->assertIsBool($reservation->valide);
    }

    /** @test */
    public function reservation_can_be_marked_as_valid()
    {
        $reservation = Location::factory()->create([
            'valide' => false
        ]);

        $reservation->valide = true;
        $reservation->save();

        $this->assertTrue($reservation->fresh()->valide);
    }

    /** @test */
    public function reservation_can_be_marked_as_not_valid()
    {
        $reservation = Location::factory()->create([
            'valide' => true
        ]);

        $reservation->valide = false;
        $reservation->save();

        $this->assertFalse($reservation->fresh()->valide);
    }
}
