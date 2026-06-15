import { Article } from "../../types";
import { AuthorMeta } from "./AuthorMeta";
import { CodeBlock } from "./CodeBlock";

interface ArticleMainContentProps {
    article: Article;
    authorName: string;
    authorRole: string;
    authorAvatar: string;
    copied: boolean;
    onCopyCode: () => void;
}

export const ArticleMainContent: React.FC<ArticleMainContentProps> = ({
    article,
    authorName,
    authorRole,
    authorAvatar,
    copied,
    onCopyCode
}) => {
    return (
        <>
            <article className="lg:col-span-8">
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 font-mono text-[11px] font-bold border border-blue-200/60 rounded">
                            AI_OPTIMIZATION_V4
                        </span>
                        <span className="text-slate-400 font-mono text-[11px] font-semibold">{article.date || "OCT 24, 2024"}</span>
                    </div>

                    <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Author Profile details card */}
                    <AuthorMeta
                        authorName={authorName}
                        authorRole={authorRole}
                        authorAvatar={authorAvatar}
                        readTime={article.readTime || "14 MIN"}
                    />
                </header>

                {/* Long form text layout */}
                <div className="text-slate-700 font-sans text-base leading-relaxed space-y-6">

                    {/* Lead first-letter dropped capitals typography block */}
                    <p className="text-slate-900 font-medium">
                        <span className="text-5xl font-black text-blue-600 float-left mr-2.5 mt-1.5 leading-none select-none">T</span>
                        he current landscape of deep learning is shifting from model complexity toward execution efficiency. As we deploy trillion-parameter models into edge environments, the "bottleneck" is no longer just compute power, but the latency inherent in the data-shuttling between cache layers.
                    </p>

                    <p>
                        In our recent experiments at TECH_LABS, we discovered that by applying a selective sparsity mask during the quantization phase, we could reduce inference latency by up to 42% without a statistically significant drop in F1 scores. This approach relies on what we term "Neural Pruning of Redundant Pathing."
                    </p>

                    <h3 className="font-sans text-xl font-bold text-slate-900 pt-4 mb-2">Execution Logic Implementation</h3>
                    <p>
                        The implementation requires a custom kernel to handle the sparse matrix multiplication efficiently. Below is a simplified snippet of how the logic gates are calculated within our internal framework:
                    </p>

                    {/* Python code container mirrored to screen */}
                    <CodeBlock copied={copied} onCopyCode={onCopyCode} />

                    <p>
                        This optimization is particularly effective in transformer-based architectures where the self-attention mechanism often exhibits high degrees of redundancy in late-stage layers.
                    </p>
                </div>

                {/* Tag parameters */}
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-slate-200">
                    {article.tags?.map(tag => (
                        <span key={tag} className="font-mono text-[11px] font-bold bg-slate-100 text-slate-600 px-3 py-1 border border-slate-200 rounded">
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </div>

            </article>

        </>
    )
}