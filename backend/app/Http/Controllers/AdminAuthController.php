<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Mail\Contact;
use Illuminate\Support\Facades\Mail;


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

    public function ForgotPassword(Request $request)
    {
        
        $request->validate([
            'email' => 'required|email'
        ]);

        
        $admin = Admin::where('email', $request->email)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Email non trouvé'
            ], 404);
        }

        

    // Envoyer l'email
    
    Mail::to($admin->email)->send(new Contact($admin->code));
     return response()->json([
        'message' => 'Votre mot de passe a été envoyé par email.'
    ], 200);

}
}
