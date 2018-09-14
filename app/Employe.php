<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    protected $table = 'employees';
    public $timestamps = false;
    protected $guarded = ['id'];
}
