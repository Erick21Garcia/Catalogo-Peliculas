<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'director_id',
        'genre_id',
        'release_year',
    ];

    public function director()
    {
        return $this->belongsTo(Director::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
