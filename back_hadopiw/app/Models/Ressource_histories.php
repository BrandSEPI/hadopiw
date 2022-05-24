<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ressource_histories extends Model
{
    use HasFactory;

    public $fillable = [
        'ressource_id',
        'price',
    ];
}
