<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // On applique HandleCors AVANT tout
        $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);
        file_put_contents(__DIR__ . '/cors_test.txt', "CORS middleware executed\n", FILE_APPEND);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
