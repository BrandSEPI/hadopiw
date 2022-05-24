<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_histories extends Model
{
    use HasFactory;

    public $fillable = [
        'item_id',
        'price',
        'coef',
    ];
}
