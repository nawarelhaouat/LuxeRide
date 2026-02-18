<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiInsightService
{
    public function analyze(array $stats): string
    {
       $prompt = "
Tu es un consultant senior en stratégie pour des agences de location de voitures au Maroc 
(Casablanca, Rabat, Tanger, Marrakech).

Contexte du marché :
- Forte saisonnalité (été, vacances scolaires, événements)
- Clients mixtes : locaux + MRE + touristes
- Sensibilité élevée au prix
- Concurrence forte entre agences locales et plateformes en ligne

Données de l’agence :
- Réservations : {$stats['total_reservations']}
- Chiffre d'affaires : {$stats['total_revenue']} MAD
- Taux d’occupation : {$stats['occupation_rate']} %
- Taux d’annulation : {$stats['cancel_rate']} %
- Véhicule le plus loué : {$stats['top_vehicle']}

Objectif :
Produire une analyse business pertinente pour un tableau de bord décisionnel.

Contraintes strictes :
- 5 à 7 lignes maximum
- Phrases courtes et percutantes
- Ton professionnel (direction / gérant)
- Aucune liste numérotée
- Aucune explication théorique
- Recommandations concrètes, applicables immédiatement au Maroc

Axes à privilégier :
- Optimisation des prix (yield / promotions ciblées)
- Gestion de la flotte (rotation, disponibilité)
- Réduction des annulations
- Opportunités court terme (haute saison, week-end, événements)

Structure attendue :
- 1 phrase de diagnostic global
- 2 phrases sur les problèmes ou risques
- 2 à 3 phrases de recommandations actionnables
";


        $response = Http::timeout(120)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->post('http://localhost:11434/api/generate', [
                'model' => 'mistral',
                'prompt' => $prompt,
                'stream' => false,
            ]);

        if (!$response->successful()) {
            Log::error('Ollama API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return "Analyse IA indisponible.";
        }

        $data = $response->json();

        return trim($data['response'] ?? "Analyse IA indisponible.");
    }
}
