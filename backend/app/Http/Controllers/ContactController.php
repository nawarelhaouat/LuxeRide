<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactClint;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::to(env('MAIL_USERNAME'))->send(
            new ContactClint(
                $request->name,
                $request->email,
                $request->message
            )
        );

        return response()->json([
            'success' => true,
            'message' => 'Message envoyé avec succès'
        ]);
    }
}
