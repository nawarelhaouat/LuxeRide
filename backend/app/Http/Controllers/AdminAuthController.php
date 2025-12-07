<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        
        $request->validate([
            'code' => 'required|string|max:10'
        ]);

        $admin = Admin::where('code', $request->code)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Code incorrect'
            ], 401);
        }

        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Login OK',
            'admin' => $admin->only(['id_admin', 'nom', 'prenom']),
            'token' => $token,   
        ], 200);
    }
}
