<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});


Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::get('/refresh-token', [App\Http\Controllers\AuthController::class, 'refreshToken']);

Route::middleware('auth:api')->group(function () {

  Route::prefix('users')->group(function () {
    Route::get('/', [App\Http\Controllers\UserController::class, 'index']);
    Route::post('/', [App\Http\Controllers\UserController::class, 'store']);
    Route::get('/{user}', [App\Http\Controllers\UserController::class, 'show']);
    Route::put('/{user}', [App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/{user}', [App\Http\Controllers\UserController::class, 'destroy']);
  });

  Route::prefix('tickets')->group(function () {
    Route::get('/', [App\Http\Controllers\TicketController::class, 'index']);
    Route::post('/', [App\Http\Controllers\TicketController::class, 'store']);
    Route::get('/{ticket}', [App\Http\Controllers\TicketController::class, 'show']);
    Route::put('/{ticket}', [App\Http\Controllers\TicketController::class, 'update']);
    Route::delete('/{ticket}', [App\Http\Controllers\TicketController::class, 'destroy']);
  });
});
