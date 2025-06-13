<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});


Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::get('/refresh-token', [App\Http\Controllers\AuthController::class, 'refreshToken']);

Route::middleware('auth:api')->group(function () {
  Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
});
