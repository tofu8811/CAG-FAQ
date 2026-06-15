<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    use ApiResponse;

    public function publicIndex(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $posts = $this->publicPostQuery()
            ->when($validated['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($validated['category_id'] ?? null, fn ($query, int $categoryId) => $query->where('category_id', $categoryId))
            ->latest('published_at')
            ->latest();

        return $this->paginatedResponse(
            $posts->paginate($validated['per_page'] ?? 15),
            'Posts fetched successfully.',
        );
    }

    public function featured(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $posts = $this->publicPostQuery()
            ->where('is_featured', true)
            ->latest('published_at');

        return $this->paginatedResponse(
            $posts->paginate($validated['per_page'] ?? 15),
            'Featured posts fetched successfully.',
        );
    }

    public function popular(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $post = $this->publicPostQuery()
            ->orderByDesc('view_count')
            ->latest('published_at');

        return $this->paginatedResponse(
            $post->paginate($validated['per_page'] ?? 15),
            'Popular posts fetched successfully.',
        );
    }

    public function latest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $post = $this->publicPostQuery()
            ->latest('published_at')
            ->latest();

        return $this->paginatedResponse(
            $post->paginate($validated['per_page'] ?? 15),
            'Latest posts fetched successfully.',
        );
    }

    public function showBySlug(string $slug): JsonResponse
    {
        $post = $this->publicPostQuery()
            ->with(['videos', 'comments' => fn ($query) => $query->where('status', 'approved')])
            ->where('slug', $slug)
            ->firstOrFail();

        $post->increment('view_count');

        return $this->successResponse($post, 'Post fetched successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->rules());
        $tagIds = $validated['tag_ids'] ?? [];
        unset($validated['tag_ids']);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        $post = Post::create($validated);
        $post->tags()->sync($tagIds);

        return $this->successResponse(
            $post->load(['user:id,name,email', 'category:id,name,slug', 'tags:id,name,slug', 'videos']),
            'Post created successfully.',
            201,
        );
    }

    public function show(Post $post): JsonResponse
    {
        return $this->successResponse(
            $post->load(['user:id,name,email', 'category:id,name,slug', 'tags:id,name,slug', 'videos', 'comments']),
            'Post fetched successfully.',
        );
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        $validated = $request->validate($this->rules($post));
        $tagIds = $validated['tag_ids'] ?? null;
        unset($validated['tag_ids']);

        if (! isset($validated['slug']) && isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $post->update($validated);

        if (is_array($tagIds)) {
            $post->tags()->sync($tagIds);
        }

        return $this->successResponse(
            $post->load(['user:id,name,email', 'category:id,name,slug', 'tags:id,name,slug', 'videos']),
            'Post updated successfully.',
        );
    }

    public function destroy(Post $post): JsonResponse
    {
        $post->delete();

        return $this->successResponse(null, 'Post deleted successfully.');
    }

    private function rules(?Post $post = null): array
    {
        $postId = $post?->id;
        $required = $post ? 'sometimes' : 'required';

        return [
            'user_id' => [$required, 'integer', 'exists:users,id'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'title' => [$required, 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:280',
                Rule::unique('posts', 'slug')->ignore($postId),
            ],
            'excerpt' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'thumbnail_url' => ['nullable', 'string', 'max:500'],
            'status' => ['nullable', Rule::in(['draft', 'published', 'hidden'])],
            'is_featured' => ['nullable', 'boolean'],
            'view_count' => ['nullable', 'integer', 'min:0'],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
        ];
    }

    private function publicPostQuery()
    {
        return Post::query()
            ->with(['user:id,name,email', 'category:id,name,slug', 'tags:id,name,slug'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
