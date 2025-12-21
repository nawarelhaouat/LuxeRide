<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\VoitureController;

use App\Http\Controllers\DashboardController;

use App\Http\Controllers\NotificationController;


// Admin routes
Route::prefix('admin')->group(function () {

    Route::post('/login', [AdminAuthController::class, 'login']); // POST /api/admin/login

    Route::middleware('auth:admin')->group(function () {

        // Voitures admin
        Route::prefix('voiture')->controller(VoitureController::class)->group(function () {
            Route::post('/', 'store'); // POST /api/admin/voiture
            Route::put('{id}', 'update'); // PUT /api/admin/voiture/{id}
            Route::delete('{id}', 'destroy'); // DELETE /api/admin/voiture/{id}
            Route::get('/', 'index'); // GET /api/admin/voiture
            Route::get('{id}', 'show'); // GET /api/admin/voiture/{id}
        });

        // Dashboard
        Route::get('dashboard', [DashboardController::class, 'index']); // GET /api/admin/dashboard

        // Notifications
        Route::prefix('notifications')->controller(NotificationController::class)->group(function () {
            Route::get('/', 'index'); // GET /api/admin/notifications
            Route::patch('{id}/mark-read', 'markAsRead'); // PATCH /api/admin/notifications/{id}/mark-read
            Route::patch('mark-all-read', 'markAllAsRead'); // PATCH /api/admin/notifications/mark-all-read
        });
    });

});

// Client routes
Route::prefix('client/voitures')->controller(VoitureController::class)->group(function () {
    Route::get('/', 'getAllVehicles');          // GET /api/client/voitures
    Route::get('/search', 'searchVehicles');    // GET /api/client/voitures/search
    Route::get('/most-rented', 'MostRentedCars'); // GET /api/client/voitures/most-rented
});
