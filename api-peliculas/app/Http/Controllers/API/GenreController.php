<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        return Genre::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $genre = Genre::create($request->all());
        return response()->json($genre, 201);
    }

    public function show(Genre $genre)
    {
        return $genre;
    }

    public function update(Request $request, Genre $genre)
    {
        $genre->update($request->all());
        return response()->json($genre);
    }

    public function destroy(Genre $genre)
    {
        $genre->delete();
        return response()->json(null, 204);
    }
}