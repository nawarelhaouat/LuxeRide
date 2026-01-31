<?php

namespace App\Http\Controllers;

use App\Services\BusinessAnalysisService;
use App\Services\AiInsightService;

class BusinessInsightController extends Controller
{
    public function index(
        BusinessAnalysisService $analysis,
        AiInsightService $ai
    ) {
        $stats = $analysis->generateStats();
        $commentaire = $ai->analyze($stats);

        return response()->json([
            'stats' => $stats,
            'ai_comment' => $commentaire,
        ]);
    }
}
