<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        return Movie::with(['director', 'genre'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'director_id' => 'required|exists:directors,id',
            'genre_id' => 'required|exists:genres,id',
            'release_year' => 'required|digits:4|integer',
        ]);

        $movie = Movie::create($request->all());

        return response()->json($movie, 201);
    }

    public function show(Movie $movie)
    {
        return $movie->load(['director', 'genre']);
    }

    public function update(Request $request, Movie $movie)
    {
        $movie->update($request->all());

        return response()->json($movie);
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();

        return response()->json(null, 204);
    }
}