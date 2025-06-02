<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    public function index()
    {
        return Director::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $director = Director::create($request->all());
        return response()->json($director, 201);
    }

    public function show(Director $director)
    {
        return $director;
    }

    public function update(Request $request, Director $director)
    {
        $director->update($request->all());
        return response()->json($director);
    }

    public function destroy(Director $director)
    {
        $director->delete();
        return response()->json(null, 204);
    }
}