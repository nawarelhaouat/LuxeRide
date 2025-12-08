<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
});


dump("here");
