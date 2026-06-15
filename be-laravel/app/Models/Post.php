<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'category_id',
    'title',
    'slug',
    'excerpt',
    'content',
    'thumbnail_url',
    'status',
    'is_featured',
    'view_count',
    'published_at',
    'meta_title',
    'meta_description',
])]
class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, SoftDeletes;

    protected static function booted(): void
    {
        static::saving(function (Post $post): void {
            if ($post->status === 'draft') {
                $post->published_at = null;
            }

            if ($post->status === 'published' && $post->published_at === null) {
                $post->published_at = now();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'view_count' => 'integer',
            'published_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withPivot('created_at');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(PostVideo::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
