<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiResponse;

    public function publicIndex(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'parent_id' => ['nullable', 'integer', 'exists:categories,id'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $categories = Category::query()
            ->with(['parent:id,name,slug', 'children:id,parent_id,name,slug'])
            ->withCount(['posts' => fn ($query) => $this->publicPostQuery($query)])
            ->when($validated['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when(array_key_exists('parent_id', $validated), fn ($query) => $query->where('parent_id', $validated['parent_id']))
            ->orderBy('sort_order')
            ->orderBy('name');

        return $this->paginatedResponse(
            $categories->paginate($validated['per_page'] ?? 15),
            'Categories fetched successfully.',
        );
    }

    public function featured(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $categories = Category::query()
            ->with(['parent:id,name,slug'])
            ->withCount(['posts' => fn ($query) => $this->publicPostQuery($query)])
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->orderBy('name');

        return $this->paginatedResponse(
            $categories->paginate($validated['per_page'] ?? 10),
            'Featured categories fetched successfully.',
        );
    }

    public function postsBySlug(Request $request, string $slug): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $category = Category::query()
            ->where('slug', $slug)
            ->first();

        if (! $category) {
            return $this->errorResponse('Category not found.', 404);
        }

        $posts = $this->publicPostQuery(
            $category->posts()
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
            'Category posts fetched successfully.',
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
