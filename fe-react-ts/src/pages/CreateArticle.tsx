import React from "react";
import { Article, Category, ViewTab } from "../types";
import { useToast } from "../contexts/ToastContext";
import { ArticleMetadataForm } from "../components/create-article/ArticleMetadataForm";
import { ArticlePreview } from "../components/create-article/ArticlePreview";
import { CreateArticleErrorBanner } from "../components/create-article/CreateArticleErrorBanner";
import { CreateArticleHeader } from "../components/create-article/CreateArticleHeader";
import { PublishSettingsPanel } from "../components/create-article/PublishSettingsPanel";
import { RichTextEditor } from "../components/create-article/RichTextEditor";
import { useCreateArticleForm } from "../hooks/useCreateArticleForm";

interface CreateArticleProps {
  onPublish: (newArt: Article) => void;
  setActiveTab: (tab: ViewTab) => void;
  categories: Category[];
}

const covers = [
  { id: "neural-network", label: "Neural Network", desc: "Glowing Graph nodes", color: "from-blue-600 to-indigo-800" },
  { id: "motherboard", label: "Silicon Chip", desc: "Printed circuit busses", color: "from-amber-600 to-amber-900" },
  { id: "blockchain", label: "Consensus Ledger", desc: "Cryptographic consensus", color: "from-cyan-600 to-cyan-900" },
  { id: "security-gate", label: "Zero-Trust Shield", desc: "Identity security orbits", color: "from-indigo-700 to-slate-900" }
];

export const CreateArticle: React.FC<CreateArticleProps> = ({
  onPublish,
  setActiveTab,
  categories
}) => {
  const { triggerToast } = useToast();
  const form = useCreateArticleForm({ categories });

  const handlePublish = (e?: React.FormEvent) => {
    e?.preventDefault();

    const newArticle = form.buildArticle();
    if (!newArticle) return;

    onPublish(newArticle);
    triggerToast("COMPILED SUCCESSFUL - Staging doc written to central ledger. Redirecting...");

    setTimeout(() => {
      setActiveTab("Home");
    }, 1500);
  };

  const handleSaveDraft = () => {
    form.saveDraft();
    triggerToast("Draft saved successfully.");
  };

  const handleCancel = () => {
    form.resetDraft();
    setActiveTab("Home");
  };

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-10 relative">
      <CreateArticleHeader
        editorMode={form.editorMode}
        setEditorMode={form.setEditorMode}
      />

      {form.errorBanner && (
        <CreateArticleErrorBanner message={form.errorBanner} />
      )}

      {form.editorMode === "write" ? (
        <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-[fadeIn_0.25s_ease-out]">
          <div className="lg:col-span-8 space-y-6">
            <ArticleMetadataForm
              title={form.title}
              excerpt={form.excerpt}
              categoryId={form.categoryId}
              categories={categories}
              setTitle={form.setTitle}
              setExcerpt={form.setExcerpt}
              setCategoryId={form.setCategoryId}
            />

            <RichTextEditor
              content={form.content}
              wordCount={form.wordCount}
              setContent={form.setContent}
              appendMarkdown={form.appendMarkdown}
            />
          </div>

          <PublishSettingsPanel
            categories={categories}
            selectedCategoryName={form.selectedCategoryName}
            selectedCover={form.selectedCover}
            covers={covers}
            featured={form.featured}
            allowComments={form.allowComments}
            isPublic={form.isPublic}
            hashDigest={form.hashDigest}
            charCount={form.charCount}
            lastSaved={form.lastSaved}
            setSelectedCover={form.setSelectedCover}
            setFeatured={form.setFeatured}
            setAllowComments={form.setAllowComments}
            setIsPublic={form.setIsPublic}
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
          />
        </form>
      ) : (
        <ArticlePreview
          title={form.title}
          excerpt={form.excerpt}
          content={form.content}
          selectedCover={form.selectedCover}
          selectedCategoryName={form.selectedCategoryName}
          authorName={form.authorName}
          authorRole={form.authorRole}
          authorInitials={form.authorInitials}
          activeReadTimeStr={form.activeReadTimeStr}
          parsedTags={form.parsedTags}
          hashDigest={form.hashDigest}
          onBackToComposer={() => form.setEditorMode("write")}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
};
