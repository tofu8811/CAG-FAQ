<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::prefix('public')->group(function (): void {
    Route::prefix('posts')->controller(PostController::class)->group(function (): void {
        Route::get('/', 'publicIndex');
        Route::get('/featured', 'featured');
        Route::get('/popular', 'popular');
        Route::get('/latest', 'latest');
    });

     Route::prefix('post')->controller(PostController::class)->group(function (): void {
        Route::get('/{slug}', 'showBySlug');
        Route::get('/{slug}/comments', 'comments'); // chưa xử lý
        Route::post('/{slug}/comments', 'storeComment'); // chưa xử lý
    });

    Route::prefix('categories')->controller(CategoryController::class)->group(function (): void {
        Route::get('/', 'publicIndex');
        Route::get('/featured', 'featured');
        Route::get('/{slug}/posts', 'postsBySlug');
    });

    Route::get('/category/{slug}/posts', [CategoryController::class, 'postsBySlug']);

    Route::get('/tags', [TagController::class, 'publicIndex']);
    Route::get('/tag/{slug}/posts', [TagController::class, 'postsBySlug']);

    Route::get('/search', [SearchController::class, 'search']);
     

});
