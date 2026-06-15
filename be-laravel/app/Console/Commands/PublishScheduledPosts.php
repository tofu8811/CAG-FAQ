<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;

class PublishScheduledPosts extends Command
{
    protected $signature = 'posts:publish-scheduled';

    protected $description = 'Publish hidden posts whose publish time has arrived.';

    public function handle(): int
    {
        $publishedCount = Post::query()
            ->where('status', 'hidden')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->update([
                'status' => 'published',
                'updated_at' => now(),
            ]);

        $this->info("Published {$publishedCount} scheduled post(s).");

        return self::SUCCESS;
    }
}
