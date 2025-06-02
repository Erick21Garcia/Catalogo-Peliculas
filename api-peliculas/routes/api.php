<?php

use App\Http\Controllers\API\MovieController;
use App\Http\Controllers\API\GenreController;
use App\Http\Controllers\API\DirectorController;
use Illuminate\Support\Facades\Route;

Route::apiResource('movies', MovieController::class);
Route::apiResource('genres', GenreController::class);
Route::apiResource('directors', DirectorController::class);

