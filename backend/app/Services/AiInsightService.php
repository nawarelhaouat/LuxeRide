<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiInsightService
{
    public function analyze(array $stats): string
    {
        $prompt = "
Tu es un conseiller business pour une agence de location de voitures.

À partir des données suivantes :
- Réservations : {$stats['total_reservations']}
- Chiffre d'affaires : {$stats['total_revenue']} MAD
- Taux d’occupation : {$stats['occupation_rate']} %
- Taux d’annulation : {$stats['cancel_rate']} %
- Véhicule le plus loué : {$stats['top_vehicle']}

Génère un commentaire clair et court (5 à 7 lignes maximum) pour un tableau de bord.

Contraintes :
- Phrases courtes
- Style professionnel et direct
- Pas de liste numérotée
- Pas de jargon complexe

Structure attendue :
1 phrase de diagnostic
2 phrases sur les principaux problèmes
2 à 3 phrases de recommandations concrètes.
";


        $response = Http::timeout(120)->post(
            'http://ollama:11434/api/generate',
            [
                'model' => 'mistral',
                'prompt' => $prompt,
                'stream' => false,
            ]
        );

        return $response->json('response')
            ?? " Réponse IA indisponible.";
    }
}
