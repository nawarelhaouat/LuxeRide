<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/', function (Request $request) {
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Stocker l'image dans storage/app/public/images
    $path = $request->file('image')->store('images', 'public');

    // Retourner le lien complet
    return "Image uploadée avec succès ! <a href='" . asset('storage/' . $path) . "'>Voir l'image</a>";
});
