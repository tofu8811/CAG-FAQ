<?php

namespace App\Models;

use Database\Factories\PostVideoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'post_id',
    'provider',
    'title',
    'youtube_video_id',
    'youtube_url',
    'embed_url',
    'thumbnail_url',
    'sort_order',
    'is_featured',
])]
class PostVideo extends Model
{
    /** @use HasFactory<PostVideoFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_featured' => 'boolean',
        ];
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
