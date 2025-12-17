<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notifications = [
            [
                'message' => 'Nouvelle réservation créée pour Audi A4',
                'titre' => 'Nouvelle réservation',
                'lu' => false,
                'id_admin' => 'ADM001',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'message' => 'Nouvelle réservation créée pour Mercedes',
                'titre' => 'Nouvelle réservation',
                'lu' => false,
                'id_admin' => 'ADM001',
                'created_at' => Carbon::now()->subMinutes(5),
                'updated_at' => Carbon::now()->subMinutes(5),
            ],
            [
                'message' => 'Voiture BMW en maintenance',
                'titre' => 'Maintenance',
                'lu' => false,
                'id_admin' => 'ADM001',
                'created_at' => Carbon::now()->subHours(1),
                'updated_at' => Carbon::now()->subHours(1),
            ],
        ];

        foreach ($notifications as $notif) {
            Notification::create($notif);
        }
    }
}
