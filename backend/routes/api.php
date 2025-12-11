<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\VoitureController;

Route::prefix('voiture')->group(function () {

    Route::get('/', [VoitureController::class, 'index']);      // GET /api/voiture
    Route::get('{id}', [VoitureController::class, 'show']);    // GET /api/voiture/{id}


});

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});

Route::prefix('admin')->group(function () {
    
    Route::post('/login', [AdminAuthController::class, 'login']); // POST /api/admin/login
    Route::post('/recover-password', [AdminAuthController::class, 'ForgotPassword']); // POST /api/admin/ForgotPassword

    Route::middleware('admin')->group(function () {
      //Routes voitures
      Route::prefix('voiture')->group(function () {
          Route::post('/', [VoitureController::class, 'store']);       // POST /api/admin/voiture
          Route::put('{id}', [VoitureController::class, 'update']);    // PUT /api/admin/voiture/{id}
          Route::delete('{id}', [VoitureController::class, 'destroy']); // DELETE /api/admin/voiture/{id}
      });
    });

});

