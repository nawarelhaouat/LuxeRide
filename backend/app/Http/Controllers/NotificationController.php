<?php


namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\LocationService;
use App\Services\VoitureService;
use Carbon\Carbon;
use Illuminate\Http\Request;

Carbon::setLocale('fr');

class NotificationController extends Controller
{
    protected $locationService;
    protected $voitureService;

    public function __construct(LocationService $locationService, VoitureService $voitureService)
    {
        $this->locationService = $locationService;
        $this->voitureService = $voitureService;
    }

    /**
     * Récupérer toutes les notifications
     */
    public function index()
    {
        $notifications = Notification::orderBy('id_notification', 'desc')->get();

        $formatted = $notifications->map(function ($n) {
            $time = $n->created_at
                ? Carbon::parse($n->created_at)->diffForHumans()
                : "À l'instant";

            return [
                'id' => $n->id_notification,
                'text' => $n->message,
                'time' => $time,
                'read' => (bool)$n->lu
            ];
        });

        return response()->json($formatted);
    }

    /**
     * Marquer une notification comme lue
     */
    public function markAsRead($id)
    {
        $notif = Notification::findOrFail($id);
        $notif->lu = true;
        $notif->save();

        return response()->json(['success' => true]);
    }

    /**
     * Marquer toutes les notifications comme lues
     */
    public function markAllAsRead()
    {
        Notification::query()->update(['lu' => true]);
        return response()->json(['success' => true]);
    }

    /**
     * Générer une notification pour une nouvelle réservation
     */
    public function createReservationNotification($id_location)
    {
        $location = $this->locationService->getById($id_location);
        $voiture = $this->voitureService->getById($location['id_voiture']);

        $notif = new Notification();
        $notif->message = "Nouvelle réservation créée pour {$voiture['brand']} {$voiture['model']}";
        $notif->titre = "Nouvelle réservation";
        $notif->lu = false;
        $notif->id_admin = $location['id_admin'];
        $notif->save();
    }
}
