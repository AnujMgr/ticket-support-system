<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController as BaseController;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class AuthController extends BaseController
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $response = Http::asForm()->post(url('/oauth/token'), [
            'grant_type' => 'password',
            'client_id' => env('CLIENT_ID'),
            'client_secret' => env('CLIENT_SECRET'),
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '',
        ]);

        if (!empty($response)) {
            $token = $response->json();

            return response()
                ->json(['user' => $user, 'accessToken' => $token['access_token']])
                ->withCookie(cookie('refreshToken', $token['refresh_token'], $token['expires_in']));
        }

        return response()->json(['message' => 'Something went wrong'], 500);
    }

    public function refreshToken()
    {
        $refreshToken = request()->cookie('refreshToken');
        if(!$refreshToken) return response()->json(['message' => 'Something went wrong'], 500);
        $response = Http::asForm()->post(url('/oauth/token'), [
            'grant_type' => 'refresh_token',
            'refresh_token' => request()->cookie('refreshToken'),
            'client_id' => env('CLIENT_ID'),
            'client_secret' => env('CLIENT_SECRET'),
            'scope' => '',
        ]);

        if (empty($response)) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
        $token = $response->json();
        return response()
            ->json(['accessToken' => $token['access_token']])
            ->withCookie(cookie('refreshToken', $token['refresh_token'], $token['expires_in']));
    }
}
