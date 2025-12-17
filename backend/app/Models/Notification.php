<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notification';

    protected $primaryKey = 'id_notification';

    public $timestamps = true;

    protected $fillable = [
        'message',
        'titre',
        'lu',
        'id_admin',
    ];

    protected $casts = [
        'lu' => 'boolean',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }
}
