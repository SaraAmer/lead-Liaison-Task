<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('tasks', TaskController::class);
    Route::get('/logout', [UserController::class , 'logout']);
});
Route::post('/register', [UserController::class , 'register']);
Route::post('/login', [UserController::class , 'login']);

// Route::resource('tasks', TodoController::class);
