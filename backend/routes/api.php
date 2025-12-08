<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\VoitureController;

Route::prefix('voiture')->group(function () {

    Route::get('/', [VoitureController::class, 'index']);      // GET /api/voiture
    Route::get('{id}', [VoitureController::class, 'show']);    // GET /api/voiture/{id}

//Routes Admin
    Route::middleware('admin')->group(function () {
        Route::post('/', [VoitureController::class, 'store']);       // POST /api/voiture
        Route::put('{id}', [VoitureController::class, 'update']);    // PUT /api/voiture/{id}
        Route::delete('{id}', [VoitureController::class, 'destroy']); // DELETE /api/voiture/{id}
    });
});

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});


Route::prefix('admin')->group(function () {
    
    Route::post('/login', [AdminAuthController::class, 'login']);

});

