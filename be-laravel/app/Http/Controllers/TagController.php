<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use ApiResponse;

    public function publicIndex(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $tags = Tag::query()
            ->withCount(['posts' => fn ($query) => $this->publicPostQuery($query)])
            ->when($validated['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->orderBy('name');

        return $this->paginatedResponse(
            $tags->paginate($validated['per_page'] ?? 15),
            'Tags fetched successfully.',
        );
    }

    public function postsBySlug(Request $request, string $slug): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $tag = Tag::query()
            ->where('slug', $slug)
            ->first();

        if (! $tag) {
            return $this->errorResponse('Tag not found.', 404);
        }

        $posts = $this->publicPostQuery(
            $tag->posts()
                ->with(['user:id,name,email', 'category:id,name,slug', 'tags:id,name,slug'])
        )
            ->when($validated['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->latest();

        return $this->paginatedResponse(
            $posts->paginate($validated['per_page'] ?? 15),
            'Tag posts fetched successfully.',
        );
    }

    private function publicPostQuery($query)
    {
        return $query
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
