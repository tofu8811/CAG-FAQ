<?php

namespace App\Models;

use Database\Factories\SearchLogFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['keyword', 'result_count', 'ip_address', 'searched_at'])]
class SearchLog extends Model
{
    /** @use HasFactory<SearchLogFactory> */
    use HasFactory;

    public const UPDATED_AT = null;
    public const CREATED_AT = 'searched_at';

    protected function casts(): array
    {
        return [
            'result_count' => 'integer',
            'searched_at' => 'datetime',
        ];
    }
}
