<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\VoitureController;

use App\Http\Controllers\DashboardController;

use App\Http\Controllers\NotificationController;

Route::prefix('voiture')->group(function () {

    Route::get('/', [VoitureController::class, 'index']);      // GET /api/voiture
    Route::get('{id}', [VoitureController::class, 'show']);    // GET /api/voiture/{id}


});

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});


Route::prefix('admin')->group(function () {

    Route::post('/login', [AdminAuthController::class, 'login']); // POST /api/admin/login

    //Route Dashboard
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);      // GET /api/admin/dashboard
    });

    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);             // GET /api/admin/notifications
        Route::patch('/{id}/mark-read', [NotificationController::class, 'markAsRead']); // patch /api/admin/notifications/{id}/mark-read
        Route::patch('/mark-all-read', [NotificationController::class, 'markAllAsRead']); // patch /api/admin/notifications/mark-all-read
    });

    Route::middleware('admin')->group(function () {
      //Routes voitures
      Route::prefix('voiture')->group(function () {
          Route::post('/', [VoitureController::class, 'store']);       // POST /api/admin/voiture
          Route::put('{id}', [VoitureController::class, 'update']);    // PUT /api/admin/voiture/{id}
          Route::delete('{id}', [VoitureController::class, 'destroy']); // DELETE /api/admin/voiture/{id}
      });

    });

});

