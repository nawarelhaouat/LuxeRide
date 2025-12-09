<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Lire header Authorization
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['message' => 'Token manquant'], 401);
        }

        // Enlever "Bearer "
        $token = str_replace('Bearer ', '', $token);

       
        $tokenRow = DB::table('personal_access_tokens')
            ->where('token', hash('sha256', $token))   // Sanctum stocke en hash
            ->where('tokenable_type', 'App\Models\Admin')
            ->first();

        if (!$tokenRow) {
            return response()->json(['message' => 'Token invalide'], 401);
        }

    
        $admin = DB::table('admin')
            ->where('id_admin', $tokenRow->tokenable_id)
            ->first();

        if (!$admin) {
            return response()->json(['message' => 'Admin introuvable'], 401);
        }

        // Ajouter l’admin à la requête pour les controllers
        $request->merge(['admin' => (array) $admin]);

        return $next($request);
    }
}
