<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Post;
use App\Models\SearchLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    use ApiResponse;

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'category_slug' => ['nullable', 'string', 'exists:categories,slug'],
            'tag_id' => ['nullable', 'integer', 'exists:tags,id'],
            'tag_slug' => ['nullable', 'string', 'exists:tags,slug'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $keyword = trim($validated['q']);

        if ($keyword === '') {
            return $this->successResponse([], 'No results found.', 200, [
                'keyword' => '',
                'filters' => $this->searchFilters($validated),
            ]);
        }

        $query = Post::query()
            ->select(['id', 'user_id', 'category_id', 'title', 'slug', 'excerpt', 'thumbnail_url', 'published_at', 'view_count'])
            ->with(['user:id,name,email', 'category:id,name,slug', 'tags:id,name,slug'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->where(function ($query) use ($keyword): void {
                $query
                    ->whereFullText(['title', 'excerpt', 'content'], $keyword)
                    ->orWhereHas('category', function ($categoryQuery) use ($keyword): void {
                        $categoryQuery
                            ->where('name', 'like', "%{$keyword}%")
                            ->orWhere('slug', 'like', "%{$keyword}%");
                    })
                    ->orWhereHas('tags', function ($tagQuery) use ($keyword): void {
                        $tagQuery
                            ->where('tags.name', 'like', "%{$keyword}%")
                            ->orWhere('tags.slug', 'like', "%{$keyword}%");
                    });
            })
            ->when($validated['category_id'] ?? null, function ($query, int $categoryId): void {
                $query->where('category_id', $categoryId);
            })
            ->when($validated['category_slug'] ?? null, function ($query, string $slug): void {
                $query->whereHas('category', function ($categoryQuery) use ($slug): void {
                    $categoryQuery->where('slug', $slug);
                });
            })
            ->when($validated['tag_id'] ?? null, function ($query, int $tagId): void {
                $query->whereHas('tags', function ($tagQuery) use ($tagId): void {
                    $tagQuery->where('tags.id', $tagId);
                });
            })
            ->when($validated['tag_slug'] ?? null, function ($query, string $slug): void {
                $query->whereHas('tags', function ($tagQuery) use ($slug): void {
                    $tagQuery->where('tags.slug', $slug);
                });
            })
            ->latest('published_at')
            ->latest();

        $results = $query->paginate($validated['per_page'] ?? 15);

        SearchLog::create([
            'keyword' => mb_strtolower(preg_replace('/\s+/', ' ', $keyword)),
            'result_count' => $results->total(),
            'ip_address' => $request->ip(),
        ]);

        return $this->paginatedResponse(
            $results,
            $results->total() > 0 ? 'Search completed successfully.' : 'No results found.',
            [
                'keyword' => $keyword,
                'filters' => $this->searchFilters($validated),
            ],
        );
    }

    private function searchFilters(array $validated): array
    {
        return [
            'category_id' => $validated['category_id'] ?? null,
            'category_slug' => $validated['category_slug'] ?? null,
            'tag_id' => $validated['tag_id'] ?? null,
            'tag_slug' => $validated['tag_slug'] ?? null,
        ];
    }
}
