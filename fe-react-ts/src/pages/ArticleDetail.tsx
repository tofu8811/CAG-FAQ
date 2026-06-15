import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Article, Category } from "../types";
import { ArticleMainContent } from "../components/article-detail/ArticleMainContent";
import { ArticleActions } from "../components/article-detail/ArticleActions";
import { ArticleNewsletterCard } from "../components/article-detail/NewsletterCard";
import { RelatedResearchList } from "../components/article-detail/RelatedResearchList";
import { useToast } from "../contexts/ToastContext";


interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (article: Article) => void;
  onSelectRelated: (article: Article) => void;
  articlesPool: Article[];
  categories: Category[];
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  isSaved,
  onToggleSave,
  onSelectRelated,
  articlesPool,
  categories
}) => {
  const [copied, setCopied] = useState(false);
  const [emailSub, setEmailSub] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);
  const { triggerToast } = useToast();

  // xử lý code hiện ở codeblock = code khi copy
  const handleCopyCode = () => {
    const codeText = `Nội dung dc copy trong clipboard`;

    navigator.clipboard.writeText(codeText);
    setCopied(true);
    triggerToast("Code configuration copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSub("");
    }, 4000);
  };

  const triggerAction = (type: string) => {
    triggerToast(`Action triggered: simulated ${type} sequence complete.`);
  };

  // Safe fallback author info
  const authorName = article.author?.name || "Dr. Aris Thorne";
  const authorRole = article.author?.role || "Senior ML Architect @ TECH_LABS";
  const authorAvatar = article.author?.avatar || "AT";

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-16 relative">

      {/* Toast Notification Banner */}

      {/* Nav back trigger */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 rounded-lg text-xs font-semibold font-mono mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN_TO_LIST
      </button>

      {/* Grid container with content and action sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Main Article Body content */}
        <ArticleMainContent
          article={article}
          authorName={authorName}
          authorRole={authorRole}
          authorAvatar={authorAvatar}
          copied={copied}
          onCopyCode={handleCopyCode}
        />

        {/* Action controllers sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">

          {/* Action Bookmark panel card */}
          <ArticleActions
            article={article}
            isSaved={isSaved}
            onToggleSave={onToggleSave}
            onAction={triggerAction}
            onNotify={triggerToast}
          />

          {/* Related Articles shelf */}
          <RelatedResearchList
            article={article}
            articlesPool={articlesPool}
            categories={categories}
            onSelectRelated={onSelectRelated}
            onNotify={triggerToast}
          />

          {/* Inside-reader inline lab register box */}
          <ArticleNewsletterCard
            emailSub={emailSub}
            subSuccess={subSuccess}
            setEmailSub={setEmailSub}
            onSubscribe={handleSubscribe}
          />
        </aside>
      </div>

    </div>
  );
};
