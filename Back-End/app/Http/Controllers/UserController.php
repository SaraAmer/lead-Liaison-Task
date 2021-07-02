<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        $data = [];
        $data = $request->input();
        $user = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => bcrypt($data['password'])



        ]);
        $token = $user->createToken($user->email)->plainTextToken;

        return response(['token' => $token], 201);
    }
    public function login(Request $request)
    {
        $data = [];
        $data = $request->input();
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response(['error' => 'Wrong email or password'], 401);
        }
        $token = $user->createToken($user->email)->plainTextToken;

        return response(['token' => $token], 201);
    }
    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response(['message' => 'logged out'], 201);
    }
}
